//
// Mocha generated tests
//

var helpers = require('../helpers');

describe("RJS task", function() {

  before(function(done) {
    helpers.before(function(err) {
      if(err) return done(err);

      helpers.copyFile('test/fixtures/rjs/grunt.js', '.test/grunt.js', function(err) {
        if(err) return done(err);
        var files = [
          'rjs/sample/alpha.js',
          'rjs/sample/beta.js',
          'rjs/sample/main.js'
        ];

        helpers.copy(files, '.test/js', function(err) {
          if(err) return done(err);
          helpers.copyFile('test/fixtures/rjs/sample/sub/betaSub.js', '.test/js/sub/betaSub.js', done);
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
        // not doing anything particularly usefull in this step but the hook is here
        // if we need to
        done();
      });

      it("Then '.test/js' should be the same as 'test/fixtures/rjs/expected/'", function(done) {
        helpers.assertDir('.test/js', 'test/fixtures/rjs/expected/');
        done();
      });

    });

  });

});
