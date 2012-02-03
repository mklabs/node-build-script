
var child = require('child_process'),
  path = require('path');

// npm pretest script


// Prepares the necessary file structure before testing out the build
// script.
//
// This will create the test/fixtures directory by cloning (or pulling
// if already there) the main html5-boilerplate repo.
//

var repo = 'https://github.com/h5bp/html5-boilerplate.git',
  basedir = path.resolve('test'),
  cloned = path.existsSync(path.join(basedir, 'fixtures'));


// Clone or pull first
var cmd = cloned ? ['pull'] : ['clone', repo, 'fixtures/'];

console.log((cloned ? 'Pulling' : 'Cloning') + ' ' + repo);

spawn('git', cmd, { cwd: cloned ? path.join(basedir, 'fixtures') : basedir }, function(code) {
  if(code) throw new Error('Got errors with git ' + cmd);
});


// little spawn helper, piping out the child standard output / error
// to the current process.
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
