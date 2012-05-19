//
// Mocha generated tests
//

var assert = require('assert'),
  helpers = require('../helpers');

describe("build:minify task", function() {

  before(helpers.before);

  describe("As a build script user I want to run the build:minify task", function() {
    describe("build:minify task", function() {
      it("Given I run the 'build:minify' task", function(done) {
        helpers.run('build:minify', done);
      });

      describe("When the build script ends", function() {
        it("Then the outcome should be 'test/fixtures/default/build.minify.html'", function() {
          helpers.copyFile('.test/publish/index.html', 'test/fixtures/default/build.minify.html');
        });
      });
    });
  });
});
