
var path = require('path'),
  minimatch = require('minimatch'),
  rimraf = require("rimraf"),
  win32 = process.platform === 'win32',
  crlf = win32 ? '\r\n' : '\n';

//
// ### Tasks
//

task.registerBasicTask('intro', 'Kindly inform the developer about the impending magic', function(data, name) {

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
  var dirname = path.resolve(name);
  file.mkdir(dirname);

  var files = file.expand(['**']).filter(function(f) {
    // filter out files to exclude from `<config:mkdirs:target>`
    return data.reduce(function(a, b) {
      return a && !minimatch(f, b);
    }, true);
  });

  files.forEach(function(f) {
    if(f.charAt(f.length - 1) === '/') return file.mkdir(path.resolve(dirname, f));
    file.write(path.resolve(dirname, f), file.read(f));
  });

  log.writeln('Copy done for ' + name);
});

task.registerBasicTask('clean', 'Wipe the previous build dirs', function(data, name) {
  var cb = this.async(),
    dirname = path.resolve(name);

  task.helper('clean', dirname, function(err) {
    if(err) return fail.warn(err.message, err.errno || 3);
    cb();
  });

});


task.registerBasicTask('manifest', 'Generates manifest files automatically from static assets reference.', function(data, name) {
  // Otherwise, print a success message.
  log.writeln('not yet implemented');
});




//
// ### Helpers
//

task.registerHelper('clean', function(dir, cb) {
  if(!cb) return rimraf.sync(dir);
  rimraf(dir, cb);
});


