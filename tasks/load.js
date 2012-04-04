
var join = require('path').join;

//
// necessary file for loading tasks in subdirectories here.
// required for grunt.loadNpmTasks usage
//
module.exports = function(grunt) {
  grunt.task.loadTasks(join(__dirname, 'dom'));
  grunt.task.loadTasks(join(__dirname, 'support'));
};
