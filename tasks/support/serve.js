
var fs = require('fs'),
  path = require('path'),
  url = require('url'),
  child = require('child_process'),
  win32 = process.platform === 'win32';

task.registerMultiTask('serve', 'Spawns up a local http server', function() {

  var data = this.data,
    name = this.target;

  var cmd = win32 ? '"..\\node_modules\\.bin\\serve.cmd"' : '../node_modules/.bin/serve';

  // todo: fork instead of spawn?
  spawn(cmd, ['--port', data.port], { cwd: path.resolve(name) }, function(code, stdout, stderr) {
    if(code) fail.warn('Error spawning server' + name, code);
  });

});


function spawn(cmd, args, o, cb) {
  var stderr = [],
    stdout = [];

  var ch = child.spawn(cmd, args, o);

  ch.stdout.pipe(process.stdout, {end: false});
  ch.stderr.pipe(process.stderr);
  ch.stdout.on('data', function (data) { stdout[stdout.length] = data; });
  ch.stdout.on('data', function (data) { stderr[stderr.length] = data; });

  ch.on('exit', function(code) {
    stdout = stdout.join('\n');
    stderr = stderr.join('\n');
    if(cb) cb(code, stdout, stderr);
  });

  return ch;
}
