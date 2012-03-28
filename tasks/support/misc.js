
var path = require('path'),
  minimatch = require('minimatch'),
  rimraf = require("rimraf"),
  mkdirp = require('mkdirp'),
  win32 = process.platform === 'win32',
  fs = require('fs'),
  crlf = win32 ? '\r\n' : '\n';


//
// ### Tasks
//

task.registerTask('intro', 'Kindly inform the developer about the impending magic', function() {

  var output = [
    "=====================================================================",
    "",
    "We're going to get your site all ship-shape and ready for prime time.",
    "",
    "This should take somewhere between 15 seconds and a few minutes,",
    "mostly depending on how many images we're going to compress.",
    "",
    "Feel free to come back or stay here and follow along.",
    "",
    "====================================================================="
  ].join(crlf);

  log.writeln(output);

});


task.registerMultiTask('mkdirs', 'Prepares the build dirs', function() {

  var data = this.data,
    name = this.target,
    dirname = path.resolve(config(name));

  // support for #3. Append the staging / output directories to the list of .ignore files
  data = data.concat([config('staging') + '/**', config('output') + '/**']);

  file.mkdir(dirname);

  var files = file.expand(['**']).filter(function(f) {
    console.log('data', data);
    // filter out files to exclude from `<config:mkdirs:target>`
    return data.reduce(function(a, b) {
      return a && !minimatch(f, b);
    }, true);
  });

  files.forEach(function(src) {
    var dst = path.resolve(dirname, src);
    // only relevant on windows platform, where glob-whatev seems to also return
    // dirs, with a trailing `/`
    if(src.charAt(src.length - 1) === '/') return file.mkdir(dst);

    file.mkdir(path.dirname(dst));
    fs.writeFileSync(dst, fs.readFileSync(src));
  });


  // temporary posix fix on empty dirs that we know we want created
  // to avoid a ENOTFOUND error in file.expand of rev:img
  if(!win32) {
    file.mkdir(path.resolve(dirname, 'img'));
  }

  log.writeln('Copy done for ' + dirname);
});

task.registerTask('clean', 'Wipe the previous build dirs', function() {
  var dirs = [config('staging'), config('output')];
  dirs.forEach(task._helpers.clean);
});


task.registerMultiTask('manifest', 'Generates manifest files automatically from static assets reference.', function() {
  // Otherwise, print a success message.
  log.writeln('not yet implemented');
});


//
// ### Helpers
//

task.registerHelper('clean', function(dir, cb) {
  if(typeof cb !== 'function') return rimraf.sync(dir);
  rimraf(dir, cb);
});

task.registerHelper('mkdir', function(dir, cb) {
  if(typeof cb !== 'function') return mkdirp.sync(dir);
  mkdirp(dir, cb);
});


