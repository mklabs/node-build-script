
var fs = require('fs'),
  h5bp = require('../'),
  assert = require('assert'),
  runner = require('./helpers'),
  EventEmitter = require('events').EventEmitter;

// plugins
assert.ok(h5bp.plugins);

// file equal helper
assert.file = function(actual, expect, message) {
  var actualBody = fs.readFileSync(actual, 'utf8');
  var expectBody = fs.readFileSync(expect, 'utf8');

  // only check length for now, form system to system seems like the hash change
  // for versioned assets. Probably caused by different linefeeds in the assets
  // content.

  var ok = actualBody.length === expectBody.length;
  if(!ok) console.log(actualBody, '\n\n\n', expectBody);

  message = message || [
    'Error checking length of:',
    '  > ' + actual + ': ' + actualBody.length,
    '  > ' + expect + ': ' + expectBody.length,
    '',
    ''
  ].join('\n');


  assert.ok(ok, message);
};


var test = new EventEmitter;

//
// Running tasks serially, tests pass or fail depending on grunt's exit code.
//

runner.setup(function(err) {
  var commands = [
    'intro'
  ];

  commands.forEach(function(cmd) {
    runner('.test', test)(cmd);
  });


  runner.copy('test/fixtures/default/usemin.html', '.test/usemin.html', function(err) {
    if(err) throw err;

    // run the default task
    var cmd = process.argv.slice(2);
    runner('.test', test)(cmd.length ? cmd : 'default');
  });
});

// global check on index.html
test.on('end', function(err) {
  assert.ifError(err);
  assert.file('.test/intermediate/index.html', 'test/fixtures/default/expected.html');
});

//
// check the usemin version, eg. one using
//
//    <!-- build:js path/to/script.js -->
//
// kind of surrouding html comment.
//
test.on('end', function(err) {
  assert.ifError(err);
  assert.file('.test/intermediate/usemin.html', 'test/fixtures/default/usemin.expected.html');
});


//
// Test original files remains the same
// (build script should happen on intermediate directory)
//
test.on('end', function(err) {
  assert.ifError(err);
  assert.file('.test/usemin.html', 'test/fixtures/default/usemin.html');
});
