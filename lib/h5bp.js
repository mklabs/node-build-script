

var fs = require('fs'),
  path = require('path'),
  glob = require('glob'),
  join = path.join,
  semv = require('semver');

var h5bp = module.exports;

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
h5bp.load = function load(grunt) {
  // sanity checks for the grunt passed-in object.
  // Just checking correct version (has to be 0.3.x) for now, but might
  // extend this to slighly more props like log, task, etc.
  //
  // will probably wrap it up in another method
  if(!grunt.version) throw new Error('A grunt object must be passed in h5bp.load()');

  if(!semv.satisfies(grunt.version, '0.3.x')) throw new Error(
    'Grunt version seems invalid, should be 0.3.x. Current: ' + grunt.version
  );

  if(!grunt.task || !grunt.log || !grunt.config) throw new Error([
      'The grunt object passed in seems to not be an actual grunt.',
      'It misses important part of the api.',
      "This is either a mistake or you're trying really hard, and you should't do that"
  ].join('\n'));

  var names = Array.prototype.slice.call(arguments, 1);
  if(!names.length) names = ['**/*'];

  // should also uniq them, maybe.
  var files = names.map(function(pattern) {
    return glob.sync(pattern, { matchBase: true, cwd: taskpath });
  }).reduce(function(a, b) {
    return a.concat(b);
  });

  // expand if any one of the results is a dir, just to the first
  // level of files
  var dirs = [];
  files = files.filter(function(f) {
    var dir = fs.statSync(join(taskpath, f)).isDirectory();
    dir && dirs.push(f);
    return !dir;
  });

  // expand each found dirs, and append the results to our file array
  files = files.concat(dirs.map(function(dir) {
    return {
      dir: dir,
      files: fs.readdirSync(join(taskpath, dir)).filter(function(f) {
        return fs.statSync(join(taskpath, dir, f)).isFile();
      })
    };
  }).map(function(o) {
    return o.files.map(function(file) {
      return [o.dir, file].join('/');
    });
  }).reduce(function(a, b) {
    return a.concat(b);
  }));

  files.forEach(function(file) {
    var fn = require(path.join(taskpath, file));
    if(fn && typeof fn === 'function') {
      fn.call(grunt, grunt);
    }
  });
};
