//
// Mocha generated tests
//

var assert = require('assert'),
  helpers = require('../helpers');

describe("DOCS task", function() {

  describe("As a build script user I want to be able to run the docs task So that I can see the docs task in action", function() {

    describe("docs task", function() {

      it("Given I run the 'docs' task", function(done) {
        // runt the docs task
        helpers.run('docs', done);
      });

      it("When the script ends", function(done) {
        // not doing anything particularly usefull in this step but the hook is here
        // if we need to
        done();
      });

      describe("Then it should not fail miserably", function() {
        it("(and you should see the documention in a web browser by now..)", function() {
          assert.ok(true);
        });
      });

    });

  });

});
