var vows = require('vows'),
  path = require('path'),
  assert = require('assert'),
  helpers = require('./helpers');

vows.describe("Build Script:alternate").addBatch({
  "Running the default task with staging / output dirs set to different values": {
    topic: helpers.task('default', 'test/fixtures/grunt.dirs.js'),

    "should produce the correct file structure": function (e) {
      assert.ifError(e);

      // Basic dir check, fail if anyone is missing
      assert.ok(path.existsSync('./staging/alternate'), 'staging dir should be there');
      assert.ok(path.existsSync('./production/alternate'), 'production dir should be there');

      // Check that known dirs / files are there for each build dir
      ['./staging/alternate', './production/alternate'].forEach(function(dir) {
        var base = path.resolve(dir);

        // todo here, full list of files
        ['css', 'js', 'img', '404.html', 'favicon.ico'].forEach(function(f) {
          assert.ok(path.existsSync(path.join(dir, f)), 'in ' + dir + ' should ' + f + ' be there');
        });
      });
    }
  }
}).export(module);

