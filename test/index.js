
var h5bp = require('../'),
  assert = require('assert'),
  runner = require('./helpers'),
  EventEmitter = require('events').EventEmitter;

// plugins
assert.ok(h5bp.plugins);

var test = new EventEmitter;
test.on('end', function(err) {
  console.log('test end', arguments);
  if(err) throw err;
  console.log('done', arguments);
});

runner.setup(function(err) {
  //
  // Running tasks serially, tests pass or fail depending on grunt's exit code.
  //
  var commands = [
    'intro --verbose'
  ];

  commands.forEach(function(cmd) {
    runner('.test', test)(cmd);
  });

  // running the default task, which runs all
  // ideally a test should be done for each test individually
  runner('.test', test)('default');

});



