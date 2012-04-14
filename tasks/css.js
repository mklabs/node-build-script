
var fs = require('fs'),
  path = require('path'),
  cleanCSS = require("clean-css"),
  rjs = require('requirejs');

module.exports = function(grunt) {

  var task = grunt.task,
    config = grunt.config,
    file = grunt.file,
    log = grunt.log;

  // **css* task works pretty much the same as grunt's min task. The task
  // target is the destination, data is an array of glob patterns. These
  // files are concataned and run through requirejs optimizer to handle
  // @import inlines in CSS files.
  task.registerMultiTask('css', 'Concats, replaces @imports and minifies the CSS files', function() {
    this.requiresConfig('staging');

    // if defined, files get prepended by the output config value
    var files = this.data;

    // concat css files matching the glob patterns and write to destination
    file.write(this.target, task.helper('mincss', files, { nocompress: true }));

    // replace @import statements
    task.helper('rjs:optimize:css', this.target, this.async());

  });

  //
  // **mincss** basic utility to concat CSS files and run them through
  // [cleanCSS](https://github.com/GoalSmashers/clean-css), might opt to use
  // [https://github.com/jzaefferer/grunt-css] plugin.
  //
  task.registerHelper('mincss', function(files, o) {
    o = o || {};
    files = grunt.file.expandFiles(files);
    return files.map(function(filepath) {
      var content = file.read(filepath);
      return o.nocompress ? content : cleanCSS.process(content);
    }).join('');
  });

  // **rjs:optimize:css** is an helper using rjs to optimize a single file,
  // mainly to properly import multi-level of @import statements, which can be
  // tricky with all the url rewrites.
  //
  // file     - Path to the css file to optimize
  // options  - (optional) rjs configuration
  // cb       - callback function to call on completion
  task.registerHelper('rjs:optimize:css', function(file, options, cb) {
    if(!cb) { cb = options; options = {}; }
    options.cssIn = file;
    options.out = options.out || file;
    options.optimizeCss = 'standard.keepLines';
    var before = grunt.file.read(file);
    rjs.optimize(options, function() {
      grunt.helper('min_max_info', grunt.file.read(file), before);
      cb();
    });
  });

};

