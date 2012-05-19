//
// Mocha generated tests
//

var path = require('path'),
  helpers = require('../helpers');

describe("INIT task", function() {

  before(function(done) {
    helpers.setup({ nocopy: true }, done);
  });

  describe("As a build script user I want to be able to run the init task So that I can see this in action", function() {


    describe("init task default template", function() {

      it("Given I run the 'init' task with default template", function(done) {
        // runt the init task
        var grunt = helpers.run('init --template defaults', {
          bin: path.join(__dirname, '../../bin/h5bp')
        }, done);

      });

      it("When the script ends", function(done) {
        // not doing anything particularly usefull in this step but the hook is here
        // if we need to
        done();
      });

      it("Then '.test/' should be the same as 'test/fixtures/init/expected/'", function(done) {
        helpers.assertDir('.test/', 'test/fixtures/init/expected/');
        done();
      });

    });

    describe("init task rjs template", function() {

      it("Given I run the 'init' task with rjs template", function(done) {
        // runt the init task
        var grunt = helpers.run('init --template rjs --force', {
          bin: path.join(__dirname, '../../bin/h5bp')
        }, done);

      });

      describe("When the script ends", function(done) {
        it("Then '.test/gruntfile.js' should be the same as 'test/fixtures/init/rjs.gruntfile.js'", function(done) {
          helpers.assertFile('.test/grunt.js', 'test/fixtures/init/rjs.gruntfile.js');
          done();
        });
      });

    });
  });

});
