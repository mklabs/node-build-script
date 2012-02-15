
// stub tests - copy this file into tests/, replace the {{taskname}} by the relevant one,
// start some testing.

var vows = require('vows'),
  path = require('path'),
  assert = require('assert'),
  fs = require('fs'),
  helpers = require('./helpers');

var filepath = 'publish/css/style.css',
  orgfilepath = 'css/style.css';

var conf = {
  mkdirs: {
    intermediate: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' '),
    publish: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' ')
  },
  css: {
    'publish/css/style.css': [ 'css/style.css' ],
    'publish/css/jquery.ui.all.css': [ 'css/base/jquery.ui.all.css' ]
  }
};

vows.describe("Build Script").addBatch({
  "Running the css task": {
    topic: helpers.task('mkdirs css', conf),

    "should css generated be at the correct location": function (e) {
      assert.ifError(e);
      assert.ok(path.existsSync(filepath));
    },

    "should have css import inlined": function (e) {
      assert.ifError(e);

      var jqueryui = 'publish/css/jquery.ui.all.css',
        content = fs.readFileSync(jqueryui, 'utf8');

      assert.ok(path.existsSync(filepath), 'Should css/jquery.ui.all.css be there');
      assert.ok(!(/\r\n|\r|\n/).test(content), 'Should optimized file have no newline char');

      // todo: test inline import and nested img path

    },

    "should css generated be minified": function (e) {
      assert.ifError(e);

      //
      // how to tests programmatically than this file have been minified?
      //  * check if there is any newline?
      //  * check the new file size? and check that it's smaller than the original one?
      //

      var content = fs.readFileSync(orgfilepath, 'utf8');
      assert.ok((/\r\n|\r|\n/).test(content), 'Should original file have some newline char');

      content = fs.readFileSync(filepath, 'utf8');
      assert.ok(!(/\r\n|\r|\n/).test(content), 'Should optimized file have no newline char');

      var statold = fs.statSync(orgfilepath),
        statnew = fs.statSync(filepath);

      assert.ok(statnew.size < statold.size, 'Should the new file size be less than the original one');

      // ... assertions
    }
  }
}).export(module);

