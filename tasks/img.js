
var fs = require('fs'),
  path = require('path'),
  which = require('which');

//
// This task takes care of img optimizations by running a set of `.png`
// or `.jpg` files through optipng and jpegtran.
//
//      grunt img:<type>
//
// Gruntfile config:
//
//      ...
//      img: {
//        src: ['img/**/*'],
//        options: {
//          ...
//        }
//      }
//


module.exports = function(grunt) {

  var png = ['.png', '.bmp', '.gif', '.pnm', '.tiff'],
    jpegs = ['.jpg', 'jpeg'];

  // rev task - reving is done in the `output/` directory
  grunt.registerMultiTask('img', 'Optimizes .png/.jpg images using optipng/jpegtran', function() {
    var cb = this.async(),
      files = grunt.file.expandFiles(this.file.src);

    var pngfiles = files.filter(function(file) {
      return !!~png.indexOf(path.extname(file).toLowerCase());
    });

    var jpgfiles = files.filter(function(file) {
      return !!~jpegs.indexOf(path.extname(file).toLowerCase());
    });

    var remains = 2;
    grunt.helper('optipng', pngfiles, grunt.config('optipng'), function(err) {
      if(err) {
        grunt.log.error(err);
        return cb(false);
      }

      grunt.helper('jpegtran', jpgfiles, grunt.config('jpegtran'), function(err) {
        if(err) {
          grunt.log.error(err);
          return cb(false);
        }
        cb();
      });
    });
  });

  grunt.registerHelper('optipng', function(files, opts, cb) {
    opts = opts || {};
    cb = cb || function() {};

    var args = opts.args ? opts.args : [];
    args = args.concat(files);
    if(!files.length) return cb();
    grunt.log.writeln('Running optipng... ' + grunt.log.wordlist(files));
    var child = grunt.utils.spawn({
      cmd: '/usr/local/bin/optipng',
      args: args
    }, function() {});

    var error = function error(code) {
      if(!code) return cb();
      grunt.verbose.or.writeln();
      grunt.log.write('Running optipng...').error();
      if (code === 127) {
        grunt.log.errorlns(
        'In order for this task to work properly, optipng must be ' +
        'installed and in the system PATH (if you can run "optipng" at' +
        ' the command line, this task should work)'
        );
        grunt.warn('optipng not found.', code);
      } else {
        result.split(grunt.utils.linefeed).forEach(log.error, log);
        grunt.warn('optipng exited unexpectedly with exit code ' + code + '.', code);
      }
      return cb(err);
    };

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on('exit', error).on('error', error)

  });

  grunt.registerHelper('jpegtran', function(files, opts, cb) {
    opts = opts || {};
    cb = cb || function() {};
    opts.args = opts.args ? opts.args : ['-copy', 'none', '-optimize'];

    which('jpegtran', function(err, cmdpath) {
      if(err) return grunt.helper('not installed', 'jpegtran', cb);
      (function run(file) {
        if(!file) return cb();
        console.log(opts.args);
        var child = grunt.utils.spawn({
          cmd: cmdpath,
          args: opts.args.concat(file)
        }, function() {});

        var jpgtmp = fs.createWriteStream('jpgtmp.jpg');
        child.stdout.pipe(jpgtmp).on('close', function() {
          // output some size info about the file
          grunt.helper('min_max_stat', 'jpgtmp.jpg', file);

          // copy the temporary optimized jpg to original file
          fs.createReadStream('jpgtmp.jpg')
            .pipe(fs.createWriteStream(file)).on('close', function() {
              run(files.shift());
            })
        });
        child.stderr.pipe(process.stderr);
        child.on('exit', function(code) {
          if(code) grunt.warn('jpg exited unexpectedly with exit code ' + code + '.', code);
        })
      })(files.shift());
    });

  });

  grunt.registerHelper('not installed', function(cmd, cb) {
    grunt.verbose.or.writeln();
    grunt.log.write('Running ' + cmd + '...').error();
    grunt.log.errorlns([
      'In order for this task to work properly, :cmd must be',
      'installed and in the system PATH (if you can run ":cmd" at',
      'the command line, this task should work)'
    ].join(' ').replace(/:cmd/g, cmd));
    grunt.log.writeln('Skiping ' + cmd + ' task');
    cb && cb();
  });

};

