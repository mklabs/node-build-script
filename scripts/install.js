
var fs = require('fs'),
  exec = require('child_process').exec,
  path = require('path'),
  platform = process.platform;

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
// only if node_module/jsdom is not there yet. To update, drop the
// folder and rerun npm install
//

fs.stat(path.join(__dirname, '../node_modules/jsdom'), function(e) {
  if(!e) return;

  var npm = exec('npm install jsdom');
  npm.stdout.pipe(process.stdout);
  npm.stderr.pipe(process.stderr);
  npm.on('exit', function(code) {
    process.exit(code);
  });

});

