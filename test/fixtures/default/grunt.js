
var path = require('path');

// get the h5bp package, mainly to be able to pass some of it's
// jsdom plugins.
var h5bp = require('../');

module.exports = function(grunt) {

  // the staging directory used during the process
  var staging ='intermediate/';

  // final build output
  var output = 'publish/';

  //
  // Grunt configuration
  //
  grunt.config.init({
    // the staging directory used during the process
    staging: staging,

    // final build output
    output: output,

    // filter any files matching one of the below pattern during mkdirs task
    exclude: 'build/** node_modules/** grunt.js package.json *.md'.split(' '),

    mkdirs: {
      staging: '<config:exclude>',
      output: '<config:exclude>'
    },

    css: {
      'css/style.css': ['css/style.css']
    },

    // are resolved below the output directory
    rev: {
      js: 'js/**/*.js',
      css: 'css/**/*.css',
      img: 'img/**'
    },

    usemin: {
      files: ['**/*.html']
    },

    htmlclean: '<config:usemin>',

    dom: {

      files                   : ['*.html'],

      options: {
        //
        // cwd - base directory to work from.
        // out - optimized assets get resolved to this path.
        //
      },

      'script[data-build]'    : h5bp.plugins.script,
      'link'                  : h5bp.plugins.link,
      'img'                   : h5bp.plugins.img,
      'script, link, img'     : h5bp.plugins.rev
    }
  });

  //
  // Concat configuration - prepending output / staging values to task's target
  //
  // files are concat'd into `staging/subprop.js`
  // (eg. intermediate/js/scripts.js)
  //
  // This is necessary config for the built-in min / concat task to operate
  // on staging or output directory, without the need to prepend their values
  // directly in the task target or data (as they may be tweaked to some other values)
  //
  // Will probably flesh out a custom concat / min task, using grunt's helper to
  // handle these values prepends.
  //
  var concat = grunt.config('concat') || {};
  concat[staging + 'js/scripts.js'] = ['js/plugins.js', 'js/script.js'];
  concat[staging + 'css/style.css'] = ['css/*.css'];
  grunt.config('concat', concat);

  //
  // Min configuration - same goes the minify task
  // (eg. publish/js/scripts.js)
  //
  var min = grunt.config('min') || {};
  min[output + 'js/scripts.js'] = [staging + 'js/plugins.js', staging + 'js/script.js'];
  grunt.config('min', min);

  grunt.loadNpmTasks(path.join(__dirname, '..'));

};
