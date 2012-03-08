
## Tests

Each tasks and helpers should be unit tested with vows tests. Ideally,
the tests should cover most of the build script featureset, and they
should all be green and ☺

Currently, tests only deal with a small part of what the build script
does but gives a good sanity check.

To run the tests, from the *root* of the repo, run:

    npm test

The script executed is setup in `package.json` script test's property
and is configured like so:

    node test/helpers/run-test --all

It'll trigger a custom test runner that will ensure each tests run
serially. This is far from ideal and should change fairly soon, this was
done to circumvent some race conditions issues during testing (otherwise
a simple `vows test/*.js`).

Eventually, this also ease the process of testing on windows, where
fileglob patterns are not expanded.

## pretest / posttest

Two custom scripts are setup to run accordinly before or after the tests
have run.

The `test/helpers/pretest` script will ensure that everything is setup
before running any test, it will clone or pull the h5bp main's repo from
master into `test/fixtures/h5bp`

## Running test individually

You may want to run one test suite individually. You can do this via
vows directly or using the `test/helpers/run-test.js` helper.

    vows test/test.js --spec
    # equivalent to (if you don't have vows installed globally)
    node node_modules/vows/bin/vows test/test.js --spec

## Adding new tests

A `stub.js` file may be found in `test/helpers` and can be used as a
starting point for new tests.

**Note** At some point, we might use the really neat
[kyuri](https://github.com/nodejitsu/kyuri) so that we can write most of
our tests as cucumber feature.


## Running grunt task

In almost every test case, you might want to trigger a grunt task and
test the output. This is usually done like so

    topic: helpers.task('default', 'test/fixtures/grunt.dirs.js'),

    "should do amazing things": function(e) {
      // test assertions here...
    }

The `helper.task` eliminates a lot of boilerplate code in which you
specify the task(s) to execute and an optional `grunt.js` file that will
be copied over the `fixture/h5bp` directory.

They are usually placed into `test/fixtures/` and named based on the
test suite that use them (grunt.clean.js, grunt.css.js, grunt.dirs.js,
and so on)

