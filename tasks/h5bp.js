
var h5bp = require('../'),
  join = require('path').join;

// environment and common configuration values
// for futher usage in tasks that needs them.
//
// note: we cannot affort to use grunt's config to handle these environment
// values, and use config.init here. It might work but will most likely be
// overriden by project's gruntfile.
var env = {
  platform: process.platform,
  win32: process.platform === 'win32'
};

module.exports = function(grunt) {

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

  // Setup some sane default alias...
  grunt.registerTask('default', 'build');
  grunt.registerTask('reload', 'default connect watch:reload');

  // add similar build targets than the ant build script one
  //
  // ant build script has a nice notion of environment, this defaults to
  // production. And we only support env=prod for now.
  //
  // todo: should change the way intermediate / publish dir to work this way:
  //
  // intermediate created before running the optims. Tasks operate on top of
  // intermediate (will probably change grunt's base or direcly change
  // process.cwd for conveniency) and then, use the copy tasks to copy
  // intermediate dir to the publish one.
  //

  // not implemented tasks (add noop waithing for their impl): manifest htmlclean images copy

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

  grunt.registerTask('copy', 'TBD - Copy files from staging directory to the output one', function() {
    // * beginning of the build script: clean mkdirs
    //    * this creates the intermediate/ dir and copy all project files (minus the ignored one)
    //
    // * build script works exclusively on intermediate/
    //
    // * at the end of the build script: copy
    //    * a simple cp -r intermadiate/ publish/
    //
    // To avoid a lot of path join together file paths in config, and the
    // "staging' config value, set the base dir (in grunt, grunt.file.setBase)
    grunt.log.error('not yet implemented');
  });

};
