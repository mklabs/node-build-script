
var path = require('path');

//
// This file defines a few development tasks (not part of the plugin
// functionnality).
//
// - gendocs: doc generation for the project. Uses docco and a custom wrapper
// to h5bp-docs to generate from project wiki (submodule). All the docs are all
// compiled into one page (index.html). Docco is also used and generates from
// files in `src/` into `api/`.
//

module.exports = function(grunt) {

  grunt.registerTask('gendocs', 'Generates docs/index.html from wiki pages', function() {
    var cb = this.async();

    var gendoc = grunt.utils.spawn({
      cmd: 'grunt', opts: { cwd: path.join(__dirname, 'docs') }
    }, function() {});

    gendoc.stdout.pipe(process.stdout);
    gendoc.stderr.pipe(process.stderr);
    gendoc.on('exit', function(code) {
      if(code) grunt.warn('Something bad happend', code);
      cb();
    });
  });

};

