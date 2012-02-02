var vows = require('vows'),
  path = require('path'),
  assert = require('assert'),
  grunt = require('grunt'),
  EventEmitter = require('events').EventEmitter;

// todo:
//
// * complete these tests, should test each task independently
// * should test generated files against fixtures

vows.describe("Build Script").addBatch({
  "Running the default task": {
    topic: function() {
      var em = new EventEmitter;
      // Unfortunately, there seems to have no way to passin a callback
      // to be fired on build completion, so we're relying on a setTimeout
      // to do that, but that's not ideal.
      // todo: investigate further
      try {
        grunt.tasks(['nolint'], {
          tasks: [path.join(__dirname, '../tasks')]
        });

        // Oddly enough, setting up a slight setTimeout with
        // a delay obviously shorther than the build time triggers
        // the vows accordingly right after the build is done.
        setTimeout(em.emit.bind(em, 'success'), 2000);
      } catch(e) {
        em.emit('error', e);
      }

      return em;
    },

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
