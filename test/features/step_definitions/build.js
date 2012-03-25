
var fs = require('fs'),
  assert = require('assert'),
  http = require('http'),
  mime = require('mime'),
  path = require('path'),
  join = path.join,
  mkdirp = require('mkdirp'),
  spawn = require('child_process').spawn;

module.exports = wrapper;

// base url
var url = function(path) { return 'http://localhost:3000/' + path; };

// base test dir
var dir = join(__dirname, '../../../.test');

function wrapper() {
  this.World = require("../support/build.js").World;

  this.When(/^I launch a local http server$/, server.bind(this.Workd));

  this.When(/^I run "([^"]*)" with following configuration "([^"]*)"$/, run.bind(this.World));

  this.Given(/^I am on the "([^"]*)" page$/, function(page, callback) {
    console.log('    » Visiting ', url(page));
    var browser = this.browser;
    this.page = page;
    this.visit(url(page), function(e, res, status) {
      if(e) callback.fail(e);
      assert.equal(status, 200);
      assert.ok(browser.query('link'));
      callback();
    });
  });


  this.Then(/^I should see "([^"]*)"$/, function(fragment, callback) {
    var r = new RegExp(fragment),
      browser = this.browser;

    this.visit(url(this.page), function(e, res, status) {
      var body = browser.html();
      assert.ok(r.test(body));
      callback();
    });
  });
}


function run(task, file, cb) {
  // copy grunt fixture file to `.test`, chdir to `.test`,
  // run the build, check the output
  var base = join(__dirname, '../../../.test'),
    out = join(base, 'grunt.js');

  file = join(__dirname, '../../', file);
  mkdirp(path.dirname(out), function() {
    console.log('copy ', file, 'to', out);
    var rs = fs.createReadStream(file),
      ws = fs.createWriteStream(out);

    rs.on('error', cb.fail.bind(cb));
    rs.on('end', function(e) {
      console.log('end?');
      if(e) return cb.fail(e);
      // launch grunt task
      var grunt = gruntify([task, '-t', '../tasks', '-c', out], function(e) {
        if(e) return cb.fail(e);
        cb();
      });
      grunt.stdout.pipe(process.stdout);
      grunt.stderr.pipe(process.stdout);
      grunt.on('exit', function(code) {
        console.log('Grunt exit: ', code);
        assert.ok(!code);
        cb();
      });
    });

    rs.pipe(ws);
  });
}

function server(cb) {
  console.log('Starting http server on localhost:', 3000);
  var srv = http.createServer(function(req, res, next) {
    var url = req.url,
      filepath = join(dir, url);

    // index.html support
    filepath = filepath.slice(-1) === '/' ? join(filepath, 'index.html') : filepath;
    console.log(' » ', url);

    // response
    var rs = fs.createReadStream(filepath);
    res.setHeader('Content-Type', mime.lookup(filepath));
    rs.on('error', function(e) {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 404;
      res.end('Cannot find ' + url);
    }).pipe(res);
  }).listen(3000, cb);
}

// spawn grunt
function gruntify(args, takeOver, cb) {
  if(!cb) cb = takeOver, takeOver = false;
  console.log('Spawning grunt with following arguments');
  console.log();
  console.log('     grunt ' + args.join(' '));
  console.log();
  var o = {};
  if(takeOver) o.customFds = [0, 1, 2], console.warn('Taking over');
  return spawn('grunt', args, o);
}
