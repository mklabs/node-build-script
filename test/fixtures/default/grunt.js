
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
    staging: 'intermediate/',
    // final build output
    output: 'publish/',

    // aliases these staging dirs with their default value, may be simply renamed
    // to intermediate and publish
    intermediate: '<config:staging>',
    publish: '<config:output>',

    // filter any files matching one of the below pattern during mkdirs task
    // the pattern in the .gitignore file should work too.
    exclude: 'build/** node_modules/** grunt.js package.json *.md'.split(' '),

    mkdirs: {
      staging: '<config:exclude>'
    },

    concat: {
      dist: {
        src: ['js/plugins.js', 'js/script.js'],
        dest: 'js/scripts.js'
      }
    },

    min: {
      dist: {
        src: ['js/scripts.js'],
        dest: 'js/scripts.min.js'
      }
    },

    css: {
      'css/style.css': ['css/style.css']
    },

    rev: {
      js: 'js/**/*.js',
      css: 'css/**/*.css',
      img: 'img/**/*'
    },

    img: {
      dist: '<config:rev.img>'
    },

    usemin: {
      files: ['**/*.html']
    },

    htmlclean: '<config:usemin>',

    serve: {
      staging: { port: 3000 },
      output: { port: 3001 }
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
    }
  });


  grunt.loadNpmTasks(path.join(__dirname, '..'));

};
