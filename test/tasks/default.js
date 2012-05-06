//
// Mocha generated tests
//

var assert = require('assert'),
  helpers = require('../helpers');

describe("Default task", function() {

  before(helpers.before);

  describe("As a build script user I want to be able to run the default task So that I can see the whole tasks in action", function() {
    describe("Default task", function() {
      it("Given I run the 'default' task", function(done) {
        helpers.run('default', done);
      });

      describe("When the build script ends", function() {
        it("Then the outcome should be 'test/fixtures/default'", function() {
          helpers.assertFile('.test/publish/index.html', 'test/fixtures/default/expected.html');
        });
      });
    });
  });
});
