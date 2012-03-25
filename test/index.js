#!/usr/bin/env node

//
// Install: mkdir test && curl -o test/index.js https://raw.github.com/gist/5adc0004cd938ccb8827/index.js
//
// In your package.json file:
//
//      "scripts": {
//        "test": "node test --log"
//      }
//

//
// Test runner - coming and derived from tako's runner, itself
// contributed by @mmalecki ->
// https://raw.github.com/mikeal/tako/master/tests/run.js
//

//
// > I don't use test frameworks. I like my tests to require nothing but
// node.js, it > means they are understandable by anyone that is
// familiar with node and not my > chosen test framework.
//
// Mikeal in http://www.mikealrogers.com/posts/a-little-test-server.html
//
// I more and more tends to adopt the same approach. Being a huge fan of
// vows, using it in almost every test case I had to setup, sometimes it
// just feel good to use no test framework at all.
//
//
// ### Usage
//
// By default, `npm test` will run every assertion files in the `test/`
// repository that begins with `test-` (eg. `test/test-*`).
//
// The `--filter` configuration may be used to change the prefix filter (that
// defaults to `test-`) to run a specific set or a single test to run.
//
// Run all test, that begins with `test-`.
//
//    npm test
//
// Run a specific assertion test file
//
//    npm test --filter test-basics
//
// Run a different set of test
//
//    npm test --filter debug-
//
// The `log` option let you log stdout / stderr from assertion test
// files.
//
// The `over` option let you run each assertion files sharing the same
// file descriptor as the current process.
//
//
// ### Create
//
// The `--create` flag is there to setup basic test scaffolding, nothing
// fancy.
//
//    npm test --create test-foobar
//

var fs = require('fs'),
  path = require('path'),
  spawn = require('child_process').spawn;

var testTimeout = 8000,
  failed = [],
  success = [],
  pathPrefix = __dirname,
  lf = process.platform === 'win32' ? '\r\n' : '\n';

var cross = '   \033[31m✗ \033[39m';

var errs = {
  notests: cross + 'No test to run buddy',
  create: cross + 'Please specifiy a test name with --create',
  exists: function(file) { return cross + 'File ' + file + ' already exists'; },
  help: lf + '    Run `node test --create`' + lf
};

var pkg = require(path.join(__dirname, '../package.json'));

var opts = npmConfig();
if(opts.create) return create(opts);
var filter = new RegExp('^' + (opts.filter || 'test-'));
runTests(fs.readdirSync(pathPrefix).filter(function (test) {
  return filter.test(test);
}));


function runTest(test, o, callback) {
  var child = spawn(process.execPath, [ path.join(__dirname, test) ], o),
    over = !!opts.over,
    stdout = '',
    stderr = '',
    killTimeout;

  over || child.stdout.on('data', function (chunk) {
    stdout += chunk;
  });

  over || child.stderr.on('data', function (chunk) {
    stderr += chunk;
  });

  killTimeout = setTimeout(function () {
    child.kill();
    console.log('  ' + path.basename(test) + ' timed out');
    callback();
  }, testTimeout);

  child.on('exit', function (exitCode) {
    clearTimeout(killTimeout);

    console.log('  ' + (exitCode ? '✗' : '✔ ') + ' ' + path.basename(test));

    (exitCode ? failed : success).push(test);

    if (exitCode || opts.log) {
      process.stdout.write(stdout);
      process.stdout.write(stderr);
    }

    callback();
  });
}

function runTests(tests) {
  var index = 0;

  console.log('Running tests:');

  if(!tests.length) return console.log(errs.notests + errs.help);

  var spawnOpts = {};
  if(opts.over) spawnOpts.customFds = [0, 1, 2];

  function next() {
    if (index === tests.length - 1) {
      console.log();
      console.log('Summary:');
      console.log('  ' + success.length + '\tpassed tests');
      console.log('  ' + failed.length + '\tfailed tests');

      if(failed.length) console.log(failed.map(function(f) {
        return cross + f;
      }).join('\n'));
      console.log();

      process.exit(failed.length);
    }
    runTest(tests[++index], spawnOpts, next);
  }
  runTest(tests[0], spawnOpts, next);
}

// extract npm config information from process.env and process.argv and returns
// a Hash object with key / value pair.
//
// - obj    - the object to parse, default to process.env
// - filter - the RegExp prefix filter to apply on obj keys, defaults to
// `npm_config_`. It also replaces prefix in returned hash object keys.
//
function npmConfig(obj, filter) {
  obj = obj || process.env;
  filter = filter || /^npm_config_/;

  var f = /^--?/;
  var args = process.argv.slice(2).map(function(value, i, arr) {
    var n = f.test(value) ? value : '',
      val = n ? arr[i + 1] : value;

    return {
      name: n.replace(f, ''),
      value: val || true
    }
  });

  args = args.filter(function(o) { return o.name }).reduce(function(a, b) {
    a[b.name] = b.value;
    return a;
  }, {});

  var opts = Object.keys(process.env);
  opts = opts.filter(function(opt) {
    return filter.test(opt);
  });

  opts = opts.map(function(opt) {
    return {
      name: opt,
      value: process.env[opt]
    }
  });

  opts = opts.reduce(function(a, b) {
    a[b.name.replace(filter, '')] = b.value;
    return a;
  }, {});

  // shallow copy of argv hash into opts to merge the two
  opts = (function(obj, source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
    return obj;
  })(opts, args);

  return opts;
}

// **create** initializes a assertion file.
function create(opts, cb) {
  cb = cb || function(e) { e && console.error(e.message); };

  var value = opts.create === 'true' ? true : opts.create;
  if(value === true) return cb(new Error(errs.create));
  value = path.extname(value) ? value : value + '.js';
  value = value.replace(/\s/g, '-');

  // append a `test-` prefix
  var prefix = /^test\-/.test(value);
  value = prefix ? value : 'test-' + value;

  var file = path.join(__dirname, value);
  console.log('Create', file);

  fs.stat(file, function(e) {
    if(!e) return cb(new Error(errs.exists(file)));
    var ws = fs.createWriteStream(file);

    pkg.filepath = file;
    pkg.filename = value.replace(path.extname(value), '');
    testTemplate(pkg).split(lf).forEach(function(line) {
      ws.write(line + lf);
    });

    ws.end();
    console.log('Done', file, 'created');
  });
}


function testTemplate(data) {
  data = data || {};

  var lines = [
    '',
    "var fs = require('fs'),",
    "  path = require('path'),",
    "  assert = require('assert'),",
    "  $name = require('../');",
    "",
    "//",
    "// $name - $description",
    "// $filename",
    ""
  ].join(lf);

  var reg = /[^\w\d]/g;
  return lines
    .replace(/\$name/g, data.name.charAt(0).toUpperCase() + data.name.slice(1))
    .replace(/\$description/g, data.description)
    .replace(/\$filename/g, '*' + (data.filename || '').replace(reg, '') + '*');
}
