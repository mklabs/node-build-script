

var fs = require('fs'),
  path = require('path'),
  h5bp = module.exports;

var taskpath = path.join(__dirname, '../tasks');

// hoist up any plugins onto the plugin object as lazy-loaded getters.
h5bp.plugins = require('./plugins');

// **load** is meant to be used in one of the task files loaded by grunt,
// either it is grunt.js file or some other task file.
//
//    require('node-build-script').load();
//
// A list of task name can be supplied to load specific task(s).
//
//    require('node-build-script').load('dom', 'css');
//
h5bp.load = function load() {
  var names = Array.prototype.slice.call(arguments);
  if(!names.length) names = ['all'];

  var files = fs.readdirSync(taskpath);

  // normalize extname
  names = names.map(function(name) {
    return path.extname(name) ? name : name + '.js';
  });

  files = files.filter(function(file) {
    return (names[0] === 'all.js') || !!~names.indexOf(file);
  });

  files = files.filter(function(file) {
    var dir = fs.statSync(path.join(taskpath, file)).isDirectory(),
      extname = path.extname(file);

    return !dir && extname === '.js';
  });

  files.forEach(function(file) {
    require(path.join(taskpath, file));
  });
};
