var vows = require('vows'),
  path = require('path'),
  assert = require('assert'),
  helpers = require('./helpers');

// todo:
//
// * complete these tests, should test each task independently
// * should test generated files against fixtures

vows.describe("Build Script").addBatch({
  "Running the mkdirs task": {
    topic: helpers.task('clean mkdirs'),

    "should produce the correct file structure": function (e) {
      assert.ifError(e);

      // Basic dir check, fail if anyone is missing
      assert.ok(path.existsSync('./intermediate'), 'intermediate dir should be there');
      assert.ok(path.existsSync('./publish'), 'publish dir should be there');

      // Check that known dirs / files are there for each build dir
      ['./intermediate', './publish'].forEach(function(dir) {
        var base = path.resolve(dir);

        // todo here, full list of files
        ['css', 'js', 'img', '404.html', 'favicon.ico'].forEach(function(f) {
          assert.ok(path.existsSync(path.join(dir, f)), 'in ' + dir + ' should ' + f + ' be there');
        });
      });
    }
  }
}).export(module);

