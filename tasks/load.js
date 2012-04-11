
var h5bp = require('../'),
  join = require('path').join;

//
// necessary file for loading tasks in subdirectories here.
// required for grunt.loadNpmTasks usage
//
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

  grunt.task.loadTasks(join(__dirname, 'dom'));
  grunt.task.loadTasks(join(__dirname, 'support'));
};
