var fs = require('fs'),
  path = require('path'),
  fork = require('child_process').fork,
  assert = require('assert'),
  rimraf = require('rimraf'),
  mkdirp = require('mkdirp'),
  ncp = require('ncp').ncp,
  EventEmitter = require('events').EventEmitter;

// path to the grunt executable
var gruntpath = path.resolve('node_modules/grunt/bin/grunt');

// helpers exports
var helpers = module.exports;


// mocha `before()` handler, to execute on each task test
helpers.before = function(done) {
  helpers.setup(function(err) {
    if(err) return done(err);

    var imgs = ['default/1.png', 'default/2.png', 'default/3.png', 'default/4.png', 'default/5.jpg', 'default/6.jpg'];

    // img to copy
    helpers.copy(['default/usemin.html', 'default/index.html'], '.test', function(err) {
      if(err) return done(err);
      helpers.copy(imgs, '.test/img', done);
    });
  });
};

//
// Grunt runner helper. A stack of command is built when called, to finally run
// them sequentially on the next event loop.
//
// Depending on grunt's exit code, the test fails or pass.
//
// todo: if options.silent, rework this to redirect spawned process output to a file.
helpers.run = function grunt(cmd, options, done) {
  if(!done) done = options, options = {};

  options = options || {};
  options.base = options.base || '.test';

  cmd = Array.isArray(cmd) ? cmd : cmd.split(' ');

  console.log([
    '', '', '',
    '... Running in ' + path.resolve(options.base) + ' ...',
    '... » grunt ' + cmd + ' ...',
    '', '', ''
  ].join('\n'));

  // we want $PATH in forked process environment for the which package to
  // work appropriately when run via npm test
  var env = { PATH: process.env.PATH };

  // run grunt via child_process.fork, setting up cwd to test dir and
  // necessary environment variables.
  var gpr = fork(gruntpath, cmd, { cwd: path.resolve(options.base), env: env });
  gpr.on('exit', function(code, stdout, stderr) {
    assert.equal(code, 0, ' ✗ Grunt exited with errors. Code: ' + code);
    console.log([
      '', '', '',
      '... Done, without errors.',
      '... ✔ grunt ' + cmd + ' ...',
      '', '', ''
    ].join('\n'));
    done();
  });
};

//
// **setup** tests. Meant to be called before running individual tests.
// Not automated, must be called explicitely. Equivalent of npm's pretest script.
//
//    rm -rf .test
//    mkdir .test
//    cp -r test/h5bp/* test/h5bp/.htaccess test/fixtures/grunt.js .test/
//
// todo: do copy with fstream
helpers.setup = function setup(o, cb) {
  if(!cb) cb = o, o = {};

  // test dir, $pkgroot/.test
  var dest = o.base || o.dest || path.join(__dirname, '../../.test');

  // source dir, test/h5bp submodule
  var source = o.source || path.join(__dirname, '../h5bp');

  // test gruntfile
  var gruntfile = o.gruntfile || o.grunt || path.join(__dirname, '../fixtures/default/grunt.js');

  // ignore handler
  var ignore = o.ignore || function ignore(name) {
    return path.basename(name) !== '.git';
  };

  // rm -rf .test
  rimraf(dest, function(err) {
    if(err) return cb(err);

    // && mkdirp ./test
    mkdirp(dest, function(err) {
      if(err) return cb(err);

      // cp -r test/h5bp/* test/fixtures/grunt.js .test/
      ncp(source, dest, { filter: ignore }, function(err) {
        if(err) return cb(err);

        // specific copy of test/fixtures/grunt.js
        var ws = fs.createWriteStream(path.join(dest, 'grunt.js')).on('close', cb);
        fs.createReadStream(gruntfile).pipe(ws);
      });
    });
  });
};


//
// **copy** helper, creates a new ReadStream, connects to WriteStream destination,
// call the callback on completion. sources can be a single or an Array of source files,
// destination is the destination directory.
//
// Single file copy helper, meant to be used by tests and beforeTest handler to
// copy specific files from fixtures to the .test directory
//
// Source are always resolved with test/fixtures
//
helpers.copy = function(sources, destination, cb) {
  sources = Array.isArray(sources) ? sources : sources.split(' ');
  sources = sources.map(function(file) {
    return path.resolve('test/fixtures', file);
  });

  var ln = sources.length;
  if(!ln) return cb(new Error('Sources array is empty'));

  // if we get a single file to copy and destination is not a dir
  // direct file copy
  if(ln === 1 && path.extname(destination)) {
    return fs.createReadStream(sources[0])
      .pipe(fs.createWriteStream(destination).on('close', cb));
  }

  sources.forEach(function(src) {
    var to = path.join(destination, path.basename(src)),
      rs = fs.createReadStream(src),
      ws = fs.createWriteStream(to).on('close', function() {
        if(--ln) return;
        cb();
      });

    rs.pipe(ws);
  });
};


// assertion helper to compare files, output.
helpers.assertFile = function(actual, expected) {
  var actualBody = fs.readFileSync(actual, 'utf8');
  var expectBody = fs.readFileSync(expected, 'utf8');
  assert.equal(actualBody, expectBody);
};

// assertion helper to compare directories, length and output.
helpers.assertDir = function(actual, expected) {

  var actualFiles = fs.readdirSync(actual).map(function(file) {
    return path.join(actual, file);
  });

  var expectedFiles = fs.readdirSync(expected).map(function(file) {
    return path.join(expected, file);
  });

  assert.equal(actualFiles.length, expectedFiles.length, 'Should both compared dirs have the same files');

  actualFiles.forEach(function(actual, i) {
    var expectHex = fs.readFileSync(expectedFiles[i], 'base64');
    var actualHex = fs.readFileSync(actual, 'base64');
    // if it's not, it might take a little while for mocha to do the diff
    try {
      assert.equal(expectHex, actualHex, 'Should both base64 encode value be the same');
    } catch(e) {
      console.log('\n\n');
      console.log('    ... Wooops, error processing.', actual, '. Mocha will now generate the diff for you ...');
      console.log('    ... Please, be patient. It might take a while (few seconds maybe) ...');
      console.log('');
      throw e;
    }
  });
};

