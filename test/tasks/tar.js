//
// Mocha generated tests
//

var helpers = require('../helpers');

describe("TAR task", function() {

  describe("As a  build script user I want to be able to run the tar task So that I can see the tar task in action", function() {

    describe("tar task", function() {

      it("Given I run the 'tar' task", function(done) {
        // runt the tar task
        helpers.run('tar', done);
      });

      it("When the script ends", function(done) {
        // not doing particularly usefull in this step
        // but the hook is here is we need to
        done();
      });

      it("Then '.test/tar' should be the same as 'test/fixtures/tar/expected/'", function(done) {
        helpers.assertFile('.test/tar', 'test/fixtures/tar/expected/');
        done();
      });

    });

  });

});