var util = require('util'),
  path = require('path');

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
      all: ['test/tasks/foo*.js']
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');

  // some debugging helpers
  grunt.registerTask('list-helpers', 'List all grunt registered helpers', function(helper) {
    var ls = grunt.log.wordlist(Object.keys(grunt.task._helpers), grunt.utils.linefeed);
    if(!helper) return grunt.log.ok(ls);
    grunt.log.subhead(helper + ' source:').ok(grunt.task._helpers[helper]);
  });

  grunt.registerTask('list-task', 'List all grunt registered tasks', function(t) {
    var ls = grunt.log.wordlist(Object.keys(grunt.task._tasks), grunt.utils.linefeed);
    if(!t) return grunt.log.ok(ls);
    grunt.log.subhead(t + ' source:');
    grunt.helper('inspect', grunt.task._tasks[t]);
  });

  // and the doc generation for the docs task
  grunt.registerTask('gendocs', 'Generates docs/index.html from wiki pages', function() {
    var cb = this.async();

    var gendoc = grunt.utils.spawn({
      cmd: 'grunt', opts: { cwd: path.join(__dirname, 'scripts/docs') }
    }, function() {});

    gendoc.stdout.pipe(process.stdout);
    gendoc.stderr.pipe(process.stderr);
    gendoc.on('exit', function(code) {
      if(code) grunt.warn('Something bad happend', code);
      cb();
    });
  });

  //
  // test helpers
  //
  // These are task to help generating test for a given task. Running this will generate:
  //
  // - a basic feature file in test/features/<name>.feature
  // - a step definition in test/features/steps/<name>.js
  // - a mocha test file with basic skeleton in test/tasks/<name>.js
  //
  // Usage:
  //
  //      grunt genmocha:<taskname>
  //      grunt genmocha --task <taskname>
  //

  grunt.registerTask('genmocha', 'Auto generate test files for a given task', function(taskname) {
      taskname = taskname || grunt.option('task');
      if(!taskname) return grunt.fail.fatal('A taskname must be provided');

      // async task
      var cb = this.async();

      console.log('task>>', taskname);



      grunt.utils.prompt('foo', function() {
        console.log(arguments);
      });
  });


  // grunt.registerTask('test', 'Redefine the test task to spawn mocha instead', function() {
  //
  //
  // });

};
