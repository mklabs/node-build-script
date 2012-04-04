

A significant amount of efforts have been put into setting up a basic test suite
to ensure everything is working properly.

As of now, the `default` and `usemin` task are tested.

`default` is the global task that runs the following tasks:

    grunt.registerTask('default', 'intro clean mkdirs concat css min rev usemin manifest');

Assertions on `default` task output are a good sanity check. Each tasks is then
tested individually (now the case of `usemin`)

Here we'll go through cucumberjs usage in a basic getting started guide.

This page will give a walkthrough on how to setup basic tests, how to run them
and how to write new ones.

## npm pretest

Tests are done on top of
[h5bp/html5-boilerplate](https://github.com/h5bp/html5-boilerplate/) repository.
The original repository is setup as a submodule at the `test/h5bp` location.

Running `npm test` will trigger the `pretest` npm script, and then execute the
`test/index.js` file:

```js
"pretest": "git submodule update --init"
```

## How the tests work

Testing a build script is somewhat tricky. Tests here aren't really unit tests,
they simply run a given grunt command, and run few basic assertions on the script output.

No test framework are used during the process, they require nothing but node.js.
It'll hopefully make them easier to understand for anyone that is familiar with
node and not a given chosen test framework.

Each assertion file is using a grunt helper to spawn a new process, executing a grunt command,
to finally run a few assertions on top of the output directory.

## Test structure


    * test/
      * fixtures
        * default/
          * expected.html
          * grunt.js
          * usemin.expected.html
          * usemin.html
        * ...
        * usemin/
          * expected.html
          * grunt.js
          * index.html

      * h5bp/
        * css/
        * js/
        * index.html
        * 404.html
        * ...

      * helpers/
        * index.js

      * tasks/
        * usemin/
          * index.js

* **test/fixtures**
Holds the fixtures file. If necessary test scripts will copy
files from fixtures to the test directory (`.test`) and have grunt operate on
top of that. This may include custom gruntfile and specific html files, testing
out the whole script or a specific feature. This directory usually include
subdirectories named after the task they meant to be used with.

* **test/h5bp**
this is the h5bp submodule. Running `git submodule update
--init` will make sure everything is here. Relatedly, this command is run
automatically before `npm test`.

* **test/helpers**
Contains few test helper, see below for further details.

* **test/tasks** Like `test/fixtures`, this directory usually include
subdirectories named after the task that is tested. Test files in this directory
are meant to test specific task / feature of the build script. They may be run directly using
`node test/tasks/usemin` (or any other implemented test).

## Writing a new test

Checkout the tests that have been setup, they usually are a good place to look at.

Tests are usually done like so:

```js
var fs = require('fs'),
  h5bp = require('../'),
  assert = require('assert'),
  runner = require('./helpers'),
  EventEmitter = require('events').EventEmitter;

//
// Setup the event emitter, an end event will be emitted on grunt completion.
//
// Depending on grunt's exit code, test fail or pass. Then, further assertions
// may perform few additional checks.
//
var test = new EventEmitter;

//
// Running tasks serially, tests pass or fail depending on grunt's exit code.
//

//
// `runner.setup` is mandatory, and deal with directory copy from `test/h5bp` to `.test`.
//
//  The tests and build process happens in this `.test` directory.
//
runner.setup(function(err) {

  //
  // optional fixtures copy test. Copy may copy a single or a set of files.
  //
  // Second argument is the destination, which may be a file (when copying a single file)
  // or a directory (`.test`).
  //
  runner.copy('test/fixtures/default/usemin.html', '.test/usemin.html', function(err) {
    if(err) throw err;

    // run the default task
    runner('.test', test)('default');
  });
});

// global check on index.html
test.on('end', function(err) {
  if(err) throw err;
  var result = fs.readFileSync('.test/index.html', 'utf8'),
    expected = fs.readFileSync('test/fixtures/default/expected.html', 'utf8');

  assert.equal(expected.trim(), result.trim());
});

//
// check the usemin version, eg. one using
//
//    <!-- build:js path/to/script.js -->
//
// kind of surrouding html comment.
//
test.on('end', function(err) {
  if(err) throw err;
  var result = fs.readFileSync('.test/usemin.html', 'utf8'),
    expected = fs.readFileSync('test/fixtures/default/usemin.expected.html', 'utf8');

  assert.equal(expected.trim(), result.trim());
});
```
