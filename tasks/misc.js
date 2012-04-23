
var fs = require('fs'),
  path = require('path'),
  utils = require('../').utils,
  Ignore = require('fstream-ignore'),
  fstream = require('fstream'),
  zlib = require('zlib'),
  tar = require('tar');

module.exports = function(grunt) {

  grunt.registerTask('intro', 'Kindly inform the developer about the impending magic', function() {
    var intro = grunt.config('intro') || '';
    intro = Array.isArray(intro) ? intro : [intro];
    grunt.log.writeln(intro.join(utils.linefeed));
  });

  grunt.registerMultiTask('mkdirs', 'Prepares the build dirs', function() {
    this.requires('clean');
    this.requiresConfig('staging');

    // store the current working directory, a subset of tasks needs to update
    // the grunt.file.setBase accordinly on intermediate/ dir. And we might want
    // chdir back to the original one
    var base = grunt.config('base') || grunt.option('base') || process.cwd();
    grunt.config('base', base);

    var name = this.target,
      target = path.resolve(grunt.config(name)),
      source = path.resolve(this.data),
      cb = this.async();

    // todo a way to configure this from Gruntfile
    var ignores = ['.gitignore', '.ignore', '.buildignore'];

    grunt.log
      .writeln('Copying into ' + target)
      .writeln('Ignoring ' + grunt.log.wordlist(ignores));


    grunt.helper('copy', source, target, ignores, function(e) {
      if(e) grunt.log.error(e.stack || e.message);
      else grunt.log.ok(source + ' -> ' + target);

      // Once copy done, ensure the current working directory is the intermediate one.
      grunt.file.setBase(grunt.config('staging'));
      cb(!e);
    });
  });

  grunt.registerTask('copy', 'Copies the whole staging(intermediate/) folder to output (publish/) one', function() {
    this.requiresConfig('staging', 'output');

    var config = grunt.config(),
      cb = this.async();

    // prior to run the last copy step, switch back the cwd to the original one
    // todo: far from ideal, would most likely go into other problem here
    grunt.file.setBase(config.base);

    // bypass the ignnore stuff
    var opts = { ignores: function() { return true; } };
    grunt.task.helper('copy', config.staging, config.output, opts, function(e) {
      if(e) grunt.log.error(e.stack || e.message);
      else grunt.log.ok(path.resolve(config.staging) + ' -> ' + path.resolve(config.output));
      cb(!e);
    });
  });

  grunt.registerTask('clean', 'Wipe the previous build dirs', function() {
    var dirs = [grunt.config('staging'), grunt.config('output')];
    dirs.forEach(grunt.task._helpers.rimraf);
  });

  //
  // **rimraf** is the helper wrapper for
  // [rimraf](https://github.com/isaacs/rimraf#readme) package. The
  // given `cb` callback if passed in will make the call asynchronous,
  // otherwise `rimraf.sync` is used.
  //
  grunt.registerHelper('rimraf', function(dir, cb) {
    if(typeof cb !== 'function') return utils.rimraf.sync(dir);
    utils.rimraf(dir, cb);
  });

  //
  // **mkdir** helper is basic wrapper around
  // [node-mkdirp](https://github.com/substack/node-mkdirp#readme).
  // Takes a `directory` path to create, process is async if a valid
  // callback function is passed in.
  //
  grunt.registerHelper('mkdir', function(dir, cb) {
    if(typeof cb !== 'function') return utils.mkdirp.sync(dir);
    utils.mkdirp(dir, cb);
  });


  //
  // **copy** helper uses [fstream-ignore](https://github.com/isaacs/fstream-ignore)
  // to copy the files under the `src` (usually current directory) to the specified
  // `dest`, optionnaly ignoring files specified by the `ignores` list of files.
  //
  // It filters out files that match globs in .ignore files throughout the tree,
  // like how git ignores files based on a .gitignore file.
  //
  // This helper is asynchronous only. The whole stream "pipeline" of fstream-
  // ignore is returned so that events mighh be listen to and furter streaming
  // can be done, the result would be the final stream destination instance.
  //
  // The task will "stream" the result of fstream.Ignore to `dest`, which might
  // be a raw writable Stream, or a String in which case a new fstream.Writer is
  // created automatically. If the `dest` string ends with `.tar`, then the copy
  // is done by creating a new/single `.tar` file.
  //
  // - source     - Path to the source directory.
  // - dest       - where the files will be copied to. Can be a String or a
  //                writable Stream. A new fstream.Writer (type directory) is
  //                created is dest is a String.
  // - ignores    - (optional) An Array of ignores files
  // - cb         - callback to call on completion
  //
  //
  grunt.registerHelper('copy', function(src, dest, ignores, cb) {
    if(!cb) { cb = ignores; ignores = ['.gitignore', '.ignore', '.buildignore']; }

    function error(msg) { return function(e) {
      if(!e) {
        grunt.log.writeln();
        return cb();
      }

      grunt.log.error('Oh snap >> ' + msg);
      grunt.log.error(e);
      return cb(false);
    }}

    var type = typeof dest !== 'string' ? 'stream' :
      path.extname(dest) === '.tar' ? 'tar' :
      'dir';

    var stream = new Ignore({ path: src, ignoreFiles: ignores })
      .on('child', function (c) {
        var p = c.path.substr(c.root.path.length + 1);
        grunt.log.verbose.writeln('>>' + p.grey);
        grunt.log.verbose.or.write('.');
      })
      .on('error', error('fstream-ignore reading error'));

    // raw stream pipe it trhough
    if(type === 'stream') return stream.pipe(dest)
      .on('error', error('pipe error with raw stream'))
      .on('close', error());

    // tar type, create a new "packer": tar.Pack(), zlib.Gzip(), fs.WriteStream
    if(type === 'tar') return grunt.helper('packer', stream, dest, error);

    // dir type, create a new fstream.Writer and let fstream do all the complicated stuff for us
    if(type === 'tar') return stream.pipe(fstream.Writer({ path: dest, type: 'Directory' }))
      .on('error', error('pipe error with dir stream'))
      .on('close', error());
  });

  //
  // **packker** is a simple pass-thourgh stream helper using zlib and isaacs/node-tar.
  // Takes a readable fstream (like a fstream.Reader or fstream-ignore), pass it through
  // tar.Pack() with default option, then into zlib.Gzip() and finaly to a writable fs Stream.
  //
  // gzipping should be optional.
  //
  grunt.registerHelper('packer', function(input, dest, error) {
    return input.pipe(tar.Pack())
      .on('close', error('tar creation error' + dest))
      .pipe(zlib.Gzip())
      .on('error', error('gzip error ' + dest))
      .pipe(fs.createWriteStream(dest))
      .on('error', error('Could not write ' + dest))
      .on('close', error());
  });
};


