
// todo: rewrite this file. Relying on git is ok, until testing out on a system without
// git.. This pretest script should download the latest targz from master repo and untar
// at the appropriate location.

var child = require('child_process'),
  path = require('path'),
  ncp = require('ncp').ncp;

// npm pretest script


// Prepares the necessary file structure before testing out the build
// script.
//
// This will create the test/fixtures directory by cloning (or pulling
// if already there) the main html5-boilerplate repo.
//

var repo = 'https://github.com/h5bp/html5-boilerplate.git',
  basedir = path.resolve('test'),
  cloned = path.existsSync(path.join(basedir, 'fixtures/h5bp'));


// Clone or pull first
var cmd = cloned ? ['pull'] : ['clone', repo, 'fixtures/h5bp'];

console.log((cloned ? 'Pulling' : 'Cloning') + ' ' + repo);
spawn('git', cmd, { cwd: cloned ? path.join(basedir, 'fixtures/h5bp') : basedir }, function(code) {
  if(code) throw new Error('Got errors with git ' + cmd);

  // Do some editions on h5bp repo's file, mainly to test some advanced optimization like
  // css improrts inline etc.

  // Grab the base jQuery UI CSS Theme, does have a good test case for the css import
  // inline, on several levels

  // now done by coping local files in the repo
  ncp('test/fixtures/themes', 'test/fixtures/h5bp/css', function(e) {
    if(e) throw e;
    console.log('All ok');
  });

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
