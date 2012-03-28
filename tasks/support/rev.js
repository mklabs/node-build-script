

var fs = require('fs'),
  path = require('path'),
  crypto = require('crypto');

//
// ### Tasks
//

task.registerMultiTask('rev', 'Automate the revving of assets filename', function() {

  var name = this.target,
    data = this.data;

  log.writeln('Processing revving of ' + name + ' files');
  var files = file.expand(data);

  files.forEach(function(f) {
    var p = path.resolve(f),
      md5 = task.helper('md5', p),
      renamed = [md5.slice(0, 8), path.basename(f)].join('.');

    log.writeln('md5 for ' + f + ' is ' + md5);

    // create the new file
    fs.renameSync(p, path.resolve(path.dirname(f), renamed));

    log.writeln('New filename is ' + renamed);
  });
});


//
// ### Helpers
//

task.registerHelper('md5', function(filepath) {
  var md5 = crypto.createHash('md5');
  md5.update(file.read(filepath));
  return md5.digest('hex');
});

