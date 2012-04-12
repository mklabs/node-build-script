
var fs = require('fs'),
  h5bp = require('../'),
  assert = require('assert'),
  runner = require('./helpers'),
  EventEmitter = require('events').EventEmitter;


// plugins
assert.ok(h5bp.plugins);

var test = new EventEmitter;

//
// Running tasks serially, tests pass or fail depending on grunt's exit code.
//

runner.setup(function(err) {
  var commands = [
    'intro --verbose'
  ];

  commands.forEach(function(cmd) {
    runner('.test', test)(cmd);
  });


  runner.copy('test/fixtures/default/usemin.html', '.test/usemin.html', function(err) {
    if(err) throw err;

    // run the default task
    runner('.test', test)('default');
  });
});

// global check on index.html
test.on('end', function(err) {
  if(err) throw err;
  var result = fs.readFileSync('.test/intermediate/index.html', 'utf8'),
    expected = fs.readFileSync('test/fixtures/default/expected.html', 'utf8');

  assert.equal(expected, result);
});

//
// check the usemin version, eg. one using
//
//    <!-- build:js path/to/script.js -->
//
// kind of surrouding html comment.
//
test.on('end', function(err) {
  if(err) throw err;
  var result = fs.readFileSync('.test/intermediate/usemin.html', 'utf8'),
    expected = fs.readFileSync('test/fixtures/default/usemin.expected.html', 'utf8');

  assert.equal(expected.trim(), result.trim());
});

//
// Remains to be tested:
//
//  - Check that original files are not touched.
//  -
//
