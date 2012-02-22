
var path = require('path'),
  minimatch = require('minimatch'),
  rimraf = require("rimraf"),
  win32 = process.platform === 'win32',
  crlf = win32 ? '\r\n' : '\n';

//
// ### Tasks
//

task.registerTask('intro', 'Kindly inform the developer about the impending magic', function(data, name) {

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

});


task.registerBasicTask('mkdirs', 'Prepares the build dirs', function(data, name) {
  var dirname = path.resolve(config(name));
  file.mkdir(dirname);

  var files = file.expand(['**']).filter(function(f) {
    // filter out files to exclude from `<config:mkdirs:target>`
    return data.reduce(function(a, b) {
      return a && !minimatch(f, b);
    }, true);
  });

  files.forEach(function(f) {
    // only relevant on windows platform, where glob-whatev seems to also return
    // dirs, with a trailing `/`
    if(f.charAt(f.length - 1) === '/') return file.mkdir(path.resolve(dirname, f));
    file.write(path.resolve(dirname, f), file.read(f));
  });


  // temporary posix fix on empty dirs that we know we want created
  // to avoid a ENOTFOUND error in file.expand of rev:img
  if(!win32) {
    file.mkdir(path.resolve(dirname, 'img'));
  }

  log.writeln('Copy done for ' + name);
});

task.registerTask('clean', 'Wipe the previous build dirs', function() {
  var dirs = [config('staging'), config('output')];
  dirs.forEach(task._helpers.clean);
});


task.registerBasicTask('manifest', 'Generates manifest files automatically from static assets reference.', function(data, name) {
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


