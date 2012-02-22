
// Little test helper, allowing one or more tests specifically. `npm test`
// will run all the tests, this script may be used to run a specific set of tests.
//
//
//    node tests/helpers/run-test mkdirs css [...]
//
// Pass it a `--keep` option if you'd like to not run the posttest script (to keep the build dirs)

var fs = require('fs'),
  path = require('path'),
  opts = require('nopt')(),
  rimraf = require('rimraf'),
  tests = opts.argv.remain;

console.log('About to run the following tests', tests);

tests = tests.map(function(t) {
  return path.join('test', t);
});

if(opts.all) runAll();
else if(!tests.length) console.log('Nothing to run...');
else spawn('node', ['node_modules/vows/bin/vows'].concat(tests), function(code) {
  if(code) throw new Error('Exiting code different than 0');
  // trigger the postinstall script
  if(!opts.keep) clean();
});

// little spawn helper, piping out the child standard output / error
// to the current process (taking over).
function spawn(cmd, args, cb) {
  return require('child_process').spawn(cmd, args, { customFds: [0, 1, 2] }).on('exit', function(code) {
    if(cb) cb(code);
  });
}

function runAll() {
  var files = fs.readdirSync('test').filter(function(test) {
    return fs.statSync(path.join('test', test)).isFile();
  });

  var failed = [];
  (function run(tests) {
    var test = tests.shift();
    if(!test) return done(failed);
    var file = path.join('test', test);


    spawn('node', ['node_modules/vows/bin/vows', file], function(code, stdout, stderr) {
      if(code) failed.push({ code: code, stdout: stdout, stderr: stderr });
      run(tests);
    });

  })(files);
}

function done(failed) {
  if(!opts.keep) clean();
  if(failed.length) throw new Error('Test failed: ' + JSON.stringify(failed, null, 2));
}

function clean() {
  ['intermediate', 'publish', 'staging', 'production'].map(function(dir) {
    return path.resolve('test/fixtures/h5bp', dir);
  }).forEach(rimraf.sync);
}
