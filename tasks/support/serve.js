
var fs = require('fs'),
  path = require('path');

module.exports = function(grunt) {
  var task = grunt.task,
    config = grunt.config,
    file = grunt.file,
    log = grunt.log,
    fail = grunt.fail,
    spawn = grunt.utils.spawn,
    noop = function() {};

  task.registerTask('serve', 'Spawns up a local http server on both staging / output directory', function() {
    var serve = config('serve'),
      targets = Object.keys(serve); 

    targets.forEach(function(target) {
      task.helper('serve', serve[target], target);
    });

    this.async();
  });

  // somewhat redundant with grunt's built-in serve cmd.
  // might be removed.
  task.registerHelper('serve', function(data, target) {
    var name = config(target);

    var cmd = path.join(__dirname, '../../node_modules/serve/bin/serve'),
      base = path.resolve(name);

    if(!path.existsSync(base)) {
      fail.warn(base  + ' does not exists', 3);
      return false;
    }

    var cp = spawn({
      cmd: cmd,
      args: ['--port', data.port],
      opts: {
        cwd: path.resolve(name) 
      }
    }, noop);

    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);

    return cp;
  });

};

