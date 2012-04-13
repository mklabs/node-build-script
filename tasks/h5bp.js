
var fs = require('fs'),
  join = require('path').join,
  h5bp = require('../');

//
// ant build script has a nice notion of environment, this defaults to
// production. And we only support env=prod for now.
//
// not implemented tasks (add noop waithing for their impl): manifest images
//

// environment and common configuration values
// for futher usage in tasks that needs them.
var env = {
  platform: process.platform,
  win32: process.platform === 'win32'
};

module.exports = function(grunt) {

  // store the current working directory, a subset of tasks needs to update
  // the grunt.file.setBase accordinly on intermediate/ dir. And we might want
  // chdir back to the original one
  var base = grunt.config('base') || grunt.option('base') || process.cwd();
  grunt.config('base', base);

  //
  // might change
  //
  // will probably ends up with tasks requiring the utilities directly instead
  // of relying on grunt.util augmentation.
  //
  // extend the grunt.utils object with h5bp's utilities, wrapping  require
  // calls to utility libs (rimraf, ncp, mkdirp) as lazy-loaded getters.
  //
  h5bp.utils.extend(grunt.utils);

  // configuration for the grunt-help plugin
  require('./help')(grunt);

  // Setup some default alias...
  grunt.registerTask('default', 'build:default');
  grunt.registerTask('reload', 'default connect watch:reload');

  // and build targets, these are equivalent to alias except that we
  // defined a single task and use arguments to trigger the appropriate
  // target
  var targets = {
    // these tasks run before any target runs
    pre: 'intro clean mkdirs',

    // build - minor html optimizations (extra quotes removed). inline script/style minified (default)
    default: 'concat css min rev usemin manifest htmlclean images',

    // text - same as build but without image (png/jpg) optimizing
    text: 'concat css min rev usemin manifest htmlclean',

    // buildkit - all html whitespace/comments maintained . inline script/style minified
    buildkit: 'concat css min rev usemin manifest htmlclean:minor',

    // basics - same as build minus the basic html minfication
    basics: 'intro clean mkdirs concat css min rev usemin manifest',

    // minify - same as build plus full html minification,
    minify: 'intro clean mkdirs concat css min rev usemin manifest htmlclean:compress images',

    // this runs after every valid target
    post: 'copy time'
  };

  grunt.registerTask('build', 'Run a predefined target - build:<target> \n' + grunt.log.wordlist(Object.keys(targets)), function(target) {
    var valid = Object.keys(targets);
    if(!~valid.indexOf(target)) {
      grunt.log
        .error('Not a valid target')
        .error(grunt.helper('invalid targets', targets));
      return false;
    }

    var tasks = [targets.pre, targets[target], targets.post].join(' ');
    grunt.task.run(tasks);
  });

  grunt.registerHelper('invalid targets', function(valid, code) {
    var msg = Object.keys(valid).map(function(key) {
      if(/pre|post/.test(key)) return '';
      return grunt.helper('pad', key, 10) + '# '+ valid[key];
    }).join(grunt.utils.linefeed);

    var err = new Error(grunt.utils.linefeed + msg);
    err.code = code || 3;
    return err;
  });

  grunt.registerHelper('pad', function pad(str, max) {
    return str.length > max ? str :
        str + new Array(max - str.length + 1).join(' ');
  });

  // To-be-implemented tasks
  grunt.registerTask('manifest', 'TBD - Generates appcache manifest file.', function() {
    grunt.log.error('not yet implemented');
  });

  var now = +new Date;
  grunt.registerTask('time', 'Print sucess status with elapsed time', function() {
    grunt.log.ok('Build sucess. Done in ' + ((+new Date - now) / 1000) + 's');
  });

  grunt.registerTask('images', 'TBD - Optimizes .jpg/.png images using jpegtan/optipng', function() {
    // *.png            --> optipng
    // *.jpg / *.jpeg   --> jpegtran
    grunt.log.error('not yet implemented');
  });

};
