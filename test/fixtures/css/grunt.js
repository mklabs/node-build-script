
var path = require('path');

module.exports = function(grunt) {

  //
  // Grunt configuration
  //
  grunt.config.init({

    css: {
      'css/compressed.css': ['css/style.css']
    }

  });

  grunt.loadNpmTasks(path.join(__dirname, '..'));

};
