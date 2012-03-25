
Testsing out JavaScript task has never been easier thanks to great,
greta project like [Travis](http://travis-ci.org/) or [cucumberjs](https://github.com/cucumber/cucumber-js)

Here we'll go through cucumberjs usage in a basic getting started guide.

**add the depedency to the project**

unless you'd like on a globally installed version of cucumber.

    npm i cucumber -S

**Add a new feature**

Features are written with the [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin)

    # features/build.feature
    Feature: Build feature
      As a user of h5bp's node build script
      I want to write my tests as cucumber features
      So that I can concentrate on building awesome applications

      Scenario: Launching build
        When I launch a local http server
        Given I am on the "index.html" page
        Then I should have a "css/style.css" css file

Features in cucumber go along some support files. Support files let you
setup the the environment in which steps will be run, and define step
definitions.


    // features/support/world.js
    var zombie = require('zombie');
    var World = function World(callback) {
      this.browser = new zombie.Browser(); // this.browser will be available in step definitions

      this.visit = function(url, callback) {
        this.browser.visit(url, callback);
      };

      callback(); // tell Cucumber we're finished and to use 'this' as the world instance
    };
    exports.World = World;



If you'd like further documentation on cucumberjs, you should definitely
checkout [the project's
readme](https://github.com/cucumber/cucumber-js#readme)

## Writing a new feature

*Replace `<featurename>` by the actual feature beeing tested*

#### 1. feature

Create a new file in `features/` named `<featurename>.feature`.

Add the following:

  # features/<featurename>.feature
  Feature: <featurename> feature
    As a user of h5bp's node build script
    I want to write my tests as cucumber features
    So that I can concentrate on building awesome applications

    Scenario: Launching task "dom"
      When I run "dom" with following configuration "fixtures/grunt.js"
      And I launch a local http server
      Given I am on the "index.html" page
      Then I should have a "css/style.css" css file

Then, try running `npm test`.

Unless there is previous test errors, you should something like:

    U---

    1 scenario (1 undefined)
    4 steps (1 undefined, 3 skipped)

    You can implement step definitions for undefined steps with these snippets:

    this.Then(/^I should see a "([^"]*)" css file$/, function(arg1, callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

### 2. Step definition

Creates a new step definition file in `features/step_definitions` named
`<featurename>.js`

And append the following content to this new file:

    var fs = require('fs'),
      assert = require('assert'),
      http = require('http'),
      mime = require('mime'),
      join = require('path').join;

    module.exports = wrapper;

    function wrapper() {
      this.World = require("../support/build.js").World;

      // from previous console output, copy-paste missing steps to this
      // step definition file

      this.Then(/^I should see a "([^"]*)" css file$/, function(arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
      });
    }

## Built-in step definition

> todo

* serve: When/And I launch a local http server$
Starts a basic http server serving static files under `.test/output/

* run: When/And I run ":task" with following configuration ":gruntfile"$
Spawn grunt with the specified `:gruntfile`, to run the given `:task`.

