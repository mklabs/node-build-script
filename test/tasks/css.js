//
// Mocha generated tests
//

var helpers = require('../helpers');

describe("CSS task", function() {

  // mocha converter should expose hook for before, after, beforeEach and afterEach
  before(helpers.before);

  describe("As a  build script user I want to be able to run the css task So that I can see the css task in action", function() {

    describe("css task", function() {

      it("Given I run the 'css' task", function(done) {
        // runt the css task
        helpers.run('css', done);
      });

      it("When the script ends", function(done) {
        // not doing particularly usefull in this step
        // but the hook is here is we need to
        done();
      });

      it("Then './test/css/style.css' should be the same as 'test/fixtures/css/style.css'", function(done) {
        helpers.assertFile('.test/css/style.css', 'test/fixtures/css/style.css');
        done();
      });

    });

  });

});
