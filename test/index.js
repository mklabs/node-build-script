
var assert = require('assert'),
  run = require('./helpers'),
  h5bp = require('../');

assert.ok(typeof h5bp.load === 'function');

// plugins
assert.ok(h5bp.plugins);

//
// Running tasks serially, tests pass or fail depending on grunt's exit code.
//
var commands = [
  '--version',
  'intro --verbose'
];

commands.forEach(run('.test'));

// running the default task, which runs all
// ideally a test should be done for each test individually
run('.test')('default');
