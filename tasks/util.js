
var util = require('util');

//
// This file defines a few utilities helpers.
//
// - inspect: takes an object, util.inspet it (with colorized output,
// http://nodejs.org/api/util.html#util_util_inspect_object_showhidden_depth_colors).
//

module.exports = function(grunt) {
  // Output some info on given object, using util.inspect
  grunt.registerHelper('inspect', function(o) {
    var lf = grunt.utils.linefeed;
    grunt.log.ok(util.inspect(o, false, 4, true));
    return grunt;
  });
};

