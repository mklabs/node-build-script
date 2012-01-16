
var fs = require('fs'),
  path = require('path'),
  url = require('url'),
  child = require('child_process'),
  win32 = process.platform === 'win32';

task.registerBasicTask('serve', 'Spawns up a local http server', function(data, name) {

  // not that convenient to be forced to spawn a new process to use the
  // serve bin executable (lib not exposed). Plus, npm have to deal with
  // windows commands slightly differently (./node_modules/.bin/serve ->
  // ./node_modules/.bin/serve.cmd)
  //
  // Below is a possible workaround, other solutions:
  //
  // * don't rely on visionmedia/serve package (as much as I love it,
  // this exec thing is not that ideal)
  // * PR and see if serve's author would be open to make serve requirable.
  // * It not open :p rely on a fork and define npm dependency to that
  // fork (not required to publish to npm)
  // * don't use serve, but an express or connect static server, basically
  // redoing much of what serve do.
  //
  // todo: was developped and tested on 0.6.7 posix, needs basic tests on windows.
  //

  var cmd = win32 ? '"..\\node_modules\\.bin\\serve.cmd"' : '../node_modules/.bin/serve';

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
