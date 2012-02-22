var vows = require('vows'),
  path = require('path'),
  assert = require('assert'),
  helpers = require('./helpers');

// todo:
//
// * complete these tests, should test each task independently
// * should test generated files against fixtures

vows.describe("Build Script").addBatch({
  "Running the clean task": {
    topic: helpers.task('mkdirs clean'),

    "should remove the staging and output dirs": function (e) {
      assert.ifError(e);
      var output = config('output'),
        staging = config('staging');

      // Basic dir check, fail if anyone is there, defaults and from config
      assert.ok(!path.existsSync('./intermediate'), 'intermediate dir should be deleted');
      assert.ok(!path.existsSync('./publish'), 'publish dir should be deleted');

      assert.ok(!path.existsSync(config('output')), 'intermediate dir should be deleted');
      assert.ok(!path.existsSync(config('production')), 'publish dir should be deleted');
    }
  }
}).export(module);

