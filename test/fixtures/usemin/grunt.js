
var h5bp = require('../');

module.exports = function(grunt) {
  // Grunt utilities
  var config = grunt.config,
    utils = grunt.utils;

  // extend the grunt.utils object with h5bp's utilities, wrapping  require
  // calls to utility libs (rimraf, ncp, mkdirp) as lazy-loaded getters.
  h5bp.utils.extend(utils);

  //
  // Grunt configuration
  //
  config.init({

    usemin: {
      files: ['index.html', 'without.html']
    }

  });

  // regular tasks
  grunt.loadTasks('../tasks/support');

};
