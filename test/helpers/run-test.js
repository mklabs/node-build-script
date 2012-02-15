
// Little test helper, allowing one or more tests specifically. `npm test`
// will run all the tests, this script may be used to run a specific set of tests.
//
//
//    node tests/helpers/run-test mkdirs css [...]
//
// Pass it a `--keep` option if you'd like to not run the posttest script (to keep the build dirs)

var path = require('path'),
  opts = require('nopt')(),
  rimraf = require('rimraf'),
  tests = opts.argv.remain;

console.log('About to run the following tests', tests);

tests = tests.map(function(t) {
  return path.join('test', t);
});

if(!tests.length) return console.log('Nothing to run...');

spawn('node', ['node_modules/vows/bin/vows'].concat(tests), function(code) {
  if(code) throw new Error('Exiting code different than 0');
  // trigger the postinstall script
  if(!opts.keep) ['test/fixtures/h5bp/intermediate', 'test/fixtures/h5bp/publish'].forEach(rimraf.sync);
});

// little spawn helper, piping out the child standard output / error
// to the current process (taking over).
function spawn(cmd, args, cb) {
  return require('child_process').spawn(cmd, args, { customFds: [0, 1, 2] }).on('exit', function(code) {
    if(cb) cb(code);
  });
}
