
var path = require('path');

var h5bp = require('./');


// This is the main html5-boilerplate build configuration file.
//
// Builds depends on two specific directory created during the process
// `intermediate/` and `publish/`, the first is used as a staging area, the
// second is the final result of the build that was run.
//
// These two values may be changed to something else with the `staging` and
// `output` config property below, and by changing any task config to match the new value.
//
module.exports = function(grunt) {
  // Grunt utilities
  var config = grunt.config,
    utils = grunt.utils;

  // the staging directory used during the process
  var staging ='intermediate/';

  // final build output
  var output = 'publish/';

  //
  // Grunt configuration
  //
  config.init({
    // the staging directory used during the process
    staging: staging,

    // final build output
    output: output,

    // environement and common configuration values
    // for futher usage in tasks that needs them.
    env: {
      platform: process.platform,
      win32: process.platform === 'win32'
    },

    // filter any files matching one of the below pattern during mkdirs task
    exclude: '.git* build/** node_modules/** grunt.js package.json *.md'.split(' '),

    mkdirs: {
      staging: '<config:exclude>',
      output: '<config:exclude>'
    },

    usemin: {
      files: ['**/*.html']
    },

    manifest: '<config:usemin>',

    watch: {
      files: ['js/**/*.js', 'css/**', '*.html'],
      tasks: 'default',

      reload: {
        files: '<config:watch.files>',
        tasks: 'default emit'
      }
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

    serve: {
      staging: { port: 3000 },
      output: { port: 3001 }
    },

    connect: {
      staging: {
        hostname: 'localhost',
        port: 3000,
        logs: 'dev',
        dirs: true
      },
      output: {
        hostname: 'localhost',
        port: 3001,
        logs: 'default',
        dirs: true
      }
    },

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
    },

    lint: {
      files: ['js/*.js'],
      build: ['grunt.js', 'tasks/*.js']
    }
  });

  // configuration for the grunt-help plugin
  require('./tasks/help')(grunt);

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
  var concat = config('concat') || {};
  concat[staging + 'js/scripts.js'] = ['js/plugins.js', 'js/script.js'];
  concat[staging + 'css/style.css'] = ['css/*.css'];
  config('concat', concat);

  //
  // Min configuration - same goes the minify task
  // (eg. publish/js/scripts.js)
  //
  var min = config('min') || {};
  min[output + 'js/scripts.js'] = [staging + 'js/plugins.js', staging + 'js/script.js'];
  config('min', min);

  // Run the following tasks...
  grunt.registerTask('default', 'intro clean mkdirs concat css min rev usemin manifest');
  grunt.registerTask('reload', 'default connect watch:reload');

  // dom based tasks - not loaded for windows platform
  config('env.win32') || grunt.loadTasks('./tasks/dom');

  // regular tasks
  grunt.loadTasks('./tasks/support');

};
