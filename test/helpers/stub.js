
// stub tests - copy this file into tests/, replace the {{taskname}} by the relevant one,
// start some testing.

var vows = require('vows'),
  path = require('path'),
  assert = require('assert'),
  helpers = require('./helpers');

vows.describe("Build Script").addBatch({
  "Running the {{taskname}} task": {
    topic: helpers.task('{{taskname}}'),

    "replace here the vows": function (e) {
      assert.ifError(e);

      // ... assertions
    }
  }
}).export(module);

