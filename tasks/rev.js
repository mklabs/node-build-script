

var fs = require('fs'),
  path = require('path'),
  crypto = require('crypto');


module.exports = function(grunt) {
  var task = grunt.task,
    file = grunt.file,
    log = grunt.log,
    config = grunt.config;

  // rev task - reving is done in the `output/` directory
  task.registerMultiTask('rev', 'Automate the hash renames of assets filename', function() {
    task.helper('hash', this.data);
  });

  // **hash** helper takes care of files revving, by renaming any files
  // in the given `files` pattern(s), with passed in `options`.
  //
  // - files      - String or Array of glob pattern
  // - options    - (optional) An Hash object where:
  //    - cwd     - Base directory to work from, glob patterns are
  //                prepended to this path.
  //
  task.registerHelper('hash', function(files, opts) {
    opts = opts || {};

    files = Array.isArray(files) ? files : [files];
    file.expand(files).forEach(function(f) {
      var md5 = task.helper('md5', f),
        renamed = [md5.slice(0, 8), path.basename(f)].join('.');

      grunt.verbose.ok().ok(md5);
      // create the new file
      fs.renameSync(f, path.resolve(path.dirname(f), renamed));
      log.write(f + ' ').ok(renamed);
    });
  });


  // **md5** helper is a basic wrapper around crypto.createHash, with
  // given `algorithm` and `encoding`. Both are optional and defaults to
  // `md5` and `hex` values.
  task.registerHelper('md5', function(filepath, algorithm, encoding) {
    algorithm = algorithm || 'md5';
    encoding = encoding || 'hex';
    var hash = crypto.createHash(algorithm);
    hash.update(file.read(filepath));
    log.verbose.write('Hashing ' + filepath + '...');
    return hash.digest(encoding);
  });
};



