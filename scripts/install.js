
var platform = process.platform,
  exec = require('child_process').exec;

//
// postinstall npm script - used mainly to avoid installing
// JSDOM on windows platform, or the package will fail to install.
//

//
if(platform === 'win32') return console.log([
  '',
  'Windows platform does not support DOM-based tasks yet.',
  '',
  'Skipping JSDOM install.',
  ''
].join('\n'));


//
// install latest JSDOM for posix users.  npm is used by spawning the process,
// but it could certainly be done with npm programmatically if installed
// locally.
//

var npm = exec('npm install jsdom');
npm.stdout.pipe(process.stdout);
npm.stderr.pipe(process.stderr);
npm.on('exit', function(code) {
  process.exit(code);
});
