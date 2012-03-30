
var path = require('path'),
  minimatch = require('minimatch');

module.exports = function(grunt) {

  var task = grunt.task,
    config = grunt.config,
    utils = grunt.utils,
    file = grunt.file,
    log = grunt.log,
    join = utils.join;

  task.registerTask('intro', 'Kindly inform the developer about the impending magic', function() {
    var intro = config('intro') || '';
    intro = Array.isArray(intro) ? intro : [intro];
    log.writeln(intro.join('\n'));
  });

  task.registerMultiTask('mkdirs', 'Prepares the build dirs', function() {
    var name = this.target,
      ignores = this.data,
      dirname = path.resolve(config(name)),
      cb = this.async();

    // support for #3. Append the staging / output directories to the list of .ignore files
    ignores = ignores.concat([join(config('staging') + '/**'), join(config('output') + '/**')]);

    log
      .writeln('Copying into ' + dirname)
      .writeln('Ignoring ' + log.wordlist(ignores));

    task.helper('copy', process.cwd(), dirname, { ignores: ignores }, function(e) {
      if(e) log.error(e.stack || e.message);
      else log.ok();
      cb(!e);
    });
  });

  task.registerTask('clean', 'Wipe the previous build dirs', function() {
    var dirs = [config('staging'), config('output')];
    dirs.forEach(task._helpers.rimraf);
  });

  task.registerMultiTask('manifest', 'Generates manifest files automatically from static assets reference.', function() {
    // Otherwise, print a success message.
    log.writeln('not yet implemented');
  });

  //
  // **rimraf** is the helper wrapper for
  // [rimraf](https://github.com/isaacs/rimraf#readme) package. The
  // given `cb` callback if passed in will make the call asynchronous,
  // otherwise `rimraf.sync` is used.
  //
  task.registerHelper('rimraf', function(dir, cb) {
    if(typeof cb !== 'function') return utils.rimraf.sync(dir);
    utils.rimraf(dir, cb);
  });

  //
  // **mkdir** helper is basic wrapper around
  // [node-mkdirp](https://github.com/substack/node-mkdirp#readme).
  // Takes a `directory` path to create, process is async if a valid
  // callback function is passed in.
  //
  task.registerHelper('mkdir', function(dir, cb) {
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
  // - cb         - callback to called on completion
  //
  task.registerHelper('copy', function(src, dest, opts, cb) {
    if(!cb) cb = opts, opts = {};

    var ignores = opts.ignore = opts.ignore || opts.ignores || '';

    var fn = typeof ignores === 'function';
    if(!fn) ignores = Array.isArray(ignores) ? ignores : ignores.split(' ');
    var filter = function(name) {
      if(fn) return ignores(name);
      if(name === src) return true;
      if(name === dest) return false;

      name = name.replace(src, '').replace(/^[\/\\]/, '');
      var res = ignores.map(function(ignore) {
        return minimatch(name, ignore, { matchBase: true });
      }).filter(function(result) {
        return result;
      }).length;

      if(!res) log.verbose.writeln('Copy » ' + path.join(dest, name).grey);
      return !res;
    };

    utils.ncp(src, dest, { filter: filter }, cb);
  });

};


