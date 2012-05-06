//
// Mocha generated tests
//

var helpers = require('../helpers');

describe("USEMIN task", function() {

  before(helpers.before);

  describe("As a  build script user I want to be able to run the usemin task So that I can see the usemin task in action", function() {

    describe("usemin task", function() {

      it("Given I run the 'usemin' task", function(done) {
        // runt the usemin task
        helpers.run('usemin', done);
      });

      it("When the script ends", function(done) {
        // not doing anything particularly usefull in this step
        // but the hook is here if we need to
        done();
      });

      it("Then '.test/usemin.html' should be the same as 'test/fixtures/usemin/index.html'", function(done) {
        // todo: task log output doesn't return things that were changed between
        // <!-- build:<target> path/to/foo.js --> directives
        helpers.assertFile('.test/usemin.html', 'test/fixtures/usemin/index.html');
        done();
      });

    });

  });

});
