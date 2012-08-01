//
// Mocha generated tests
//

var helpers = require('../helpers');

var describeTask = function(taskName, fixturePath) {

  describe(taskName, function() {

    before(function(done) {
      helpers.before(function(err) {
        if(err) return done(err);

        helpers.copyFile(fixturePath + 'grunt.js', '.test/grunt.js', function(err) {
          if(err) return done(err);
          var files = [
            'rjs/sample/alpha.js',
            'rjs/sample/beta.js',
            'rjs/sample/main.js'
          ];

          helpers.copy(files, '.test/js', function(err) {
            if(err) return done(err);
            helpers.copyFile(fixturePath + 'sample/sub/betaSub.js', '.test/js/sub/betaSub.js', done);
          });
        });
      });
    });

    describe("As a build script user I want to be able to run the rjs task So that I can see the rjs task in action", function() {

      describe("rjs task", function() {

        // XXX the rjs task takes up to 8s on my machine with almost nothing to
        // process (sample files are really basic...)
        // figure out what's going wrong
        it("Given I run the 'rjs' task", function(done) {
          // runt the rjs task
          helpers.run('rjs', done);
        });

        it("When the script ends", function(done) {
          // remove build.txt as it contains system-dependent almond path
          helpers.rmFile('.test/js/build.txt', function(err) {
            if (err) return done(err);
            return done();
          });
        });

        it("Then '.test/js' should be the same as " + fixturePath + "expected/'", function(done) {
          helpers.assertDir('.test/js', fixturePath + 'expected/');
          done();
        });

      });

    });

  });

};

describeTask("RJS task", 'test/fixtures/rjs/');
describeTask("RJS task (almond)", 'test/fixtures/rjs-almond/');
