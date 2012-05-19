
//
// This file defines a few development tasks (not part of the plugin
// functionnality).
//
// - list-helpers: run grunt list-helpers to get a list of all available
// helpers in this current grunt instance (built-in plus user defined ones)
//
// - list-task: same here but for tasks.
//

module.exports = function(grunt) {

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

