var fs = require('fs'),
  path = require('path'),
  path = require('path'),
  Parser = require('mocha-gherkin');

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      grunt: ['grunt.js', 'tasks/*.js'],
      lib: ['lib/plugins/*.js']
    },
    watch: {
      files: '<config:lint.grunt>',
      tasks: 'lint:grunt'
    },
    jshint: {
      options: {
        es5: true,
        node: true,
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      }
    },
    test: {
      // each task is tested individually, with basic files comparison with
      // what is in test/fixtures/
      tasks: ['test/tasks/test-*.js'],

      // default task with default options
      runThemAll: ['test/tasks/default.js']
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');


  grunt.loadTasks('./support/');



};
