
var fs = require('fs'),
  paht = require('path'),
  assert = require('assert'),
  runner = require('../../helpers'),
  EventEmitter = require('events').EventEmitter;

var test = new EventEmitter;

runner.setup(function(err) {

  var files = [
    'test/fixtures/usemin/index.html',
    'test/fixtures/usemin/without.html',
    'test/fixtures/usemin/grunt.js'
  ];

  // copy specific fixtures for this test.
  runner.copy(files, '.test', function(err) {
    if(err) throw err;

    // Run the usemin task, and see the resulting output
    runner('.test', test)('usemin');
  });
});

test.on('end', function(err) {
  if(err) throw err;
  var result = fs.readFileSync('.test/index.html', 'utf8'),
    expected = fs.readFileSync('test/fixtures/usemin/expected.html', 'utf8');

  assert.equal(result, expected);
});

