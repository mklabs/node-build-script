var assert = require('assert'),
  resolve = require('path').resolve,
  spawn = require('child_process').spawn;

//
// Grunt runner helper. A stack of command is built when called, to finally run
// them sequentially on the next event loop.
//
// Depending on grunt's exit code, the test fails or pass.
//
module.exports = function grunt(base, fn) {
  base = base || 'test/h5bp';

  return function(cmd, index) {
    var stack = grunt.stack || (grunt.stack = []);
    stack.push(cmd);

    process.nextTick(function() {
      if(grunt.started) return;
      grunt.started = true;

      // path to the grunt executable, going to node dependency but could be done
      // with the global grunt instead
      var gruntpath = resolve('node_modules/grunt/bin/grunt');

      // now that the stack is setup, run each command serially
      (function run(cmd) {
        if(!cmd) return;
        // grunt process
        var gpr = spawn(gruntpath, cmd.split(' '), { cwd: resolve(base) });
        gpr.stdout.pipe(process.stdout);
        gpr.stderr.pipe(process.stderr);

        gpr.on('exit', function(code) {
          assert.equal(code, 0, ' ✗ Grunt exited with errors. Code: ' + code);
          run(stack.shift());
        });
      })(stack.shift());
    });
  }
};

