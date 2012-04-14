var util = require('util');

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

};
