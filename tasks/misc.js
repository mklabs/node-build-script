
var path = require('path'),
  utils = require('../').utils;

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
      ignores = this.data,
      dirname = path.resolve(grunt.config(name)),
      cb = this.async();

    // support for #3. Append the staging / output directories to the list of .ignore files
    ignores = ignores.concat([path.join(grunt.config('staging') + '/**'), path.join(grunt.config('output') + '/**')]);

    grunt.log
      .writeln('Copying into ' + dirname)
      .writeln('Ignoring ' + grunt.log.wordlist(ignores));

    grunt.helper('copy', grunt.config('base'), dirname, { ignores: ignores }, function(e) {
      if(e) grunt.log.error(e.stack || e.message);
      else grunt.log.ok(grunt.config('base') + ' -> ' + dirname);

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
  // **copy** helper uses [ncp](https://github.com/AvianFlu/ncp#readme)
  // and [minimatch](https://github.com/isaacs/minimatch#readme) to copy
  // the files under the current directory to the specified `dir`,
  // optionnaly ignoring files specified by the `options.ignore` property.
  //
  // `options.ignore` can be a String of space delimited glob patterns,
  // an Array of glob patterns, or a filter function.
  //
  // This helper is asynchronous only. Paths are always relative to
  // current working directory.
  //
  // - source     - Path to the source directory
  // - dest       - where the files will be copied to
  // - opts       - (optional) An Hash object with an `ignore` property
  // - cb         - callback to call on completion
  //
  // todo: consider fstream for that.
  //
  grunt.registerHelper('copy', function(src, dest, opts, cb) {
    if(!cb) { cb = opts; opts = {}; }

    var ignores = opts.ignore = opts.ignore || opts.ignores || '';

    // default for src is always $cwd
    src = src || process.cwd();

    // gitignore
    var gitignore = path.join(src, '.gitignore');
    gitignore = !path.existsSync(gitignore) ? '' :
        grunt.file.read(gitignore).trim().split(grunt.utils.linefeed);

    var fn = typeof ignores === 'function';
    if(!fn) ignores = Array.isArray(ignores) ? ignores : ignores.split(' ');
    var filter = function(name) {
      if(fn) return ignores(name);
      if(name === src) return true;
      if(name === dest) return false;

      name = name.replace(src, '').replace(/^[\/\\]/, '');
      var res = ignores.concat(gitignore).map(function(ignore) {
        return grunt.file.isMatch(name, ignore);
      }).filter(function(result) {
        return result;
      }).length;

      if(!res) grunt.log.verbose.writeln('Copy » ' + path.join(dest, name).grey);
      return !res;
    };

    utils.ncp(src, dest, { filter: filter }, cb);
  });

};


