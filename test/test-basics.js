
var fs = require('fs'),
  path = require('path'),
  assert = require('assert'),
  h5bp = require('../');

assert.ok(typeof h5bp.load === 'function');

// plugins
assert.ok(h5bp.plugins);

