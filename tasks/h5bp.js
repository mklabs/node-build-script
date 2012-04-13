
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
  grunt.registerTask('default', 'build');
  grunt.registerTask('reload', 'default connect watch:reload');

  // build - minor html optimizations (extra quotes removed). inline script/style minified (default)
  grunt.registerTask('build', 'intro clean mkdirs concat css min rev usemin manifest htmlclean images copy');

  // text - same as build but without image (png/jpg) optimizing
  grunt.registerTask('text', 'intro clean mkdirs concat css min rev usemin manifest htmlclean copy');

  // buildkit - all html whitespace/comments maintained . inline script/style minified
  grunt.registerTask('buildkit', 'intro clean mkdirs concat css min rev usemin manifest htmlclean:minor copy');

  // basics - same as build minus the basic html minfication
  grunt.registerTask('basics', 'intro clean mkdirs concat css min rev usemin manifest copy');

  // minify - same as build plus full html minification
  grunt.registerTask('minify', 'intro clean mkdirs concat css min rev usemin manifest htmlclean:compress images copy');

  // To-be-implemented tasks
  grunt.registerTask('manifest', 'TBD - Generates appcache manifest file.', function() {
    grunt.log.error('not yet implemented');
  });

  grunt.registerTask('images', 'TBD - Optimizes .jpg/.png images using jpegtan/optipng', function() {
    // *.png            --> optipng
    // *.jpg / *.jpeg   --> jpegtran
    grunt.log.error('not yet implemented');
  });

};
