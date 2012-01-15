
var fs = require('fs'),
  path = require('path'),
  crypto = require('crypto'),
  exec = require('child_process').exec,
  minimatch = require('minimatch'),
  rimraf = require('rimraf'),
  cleanCSS = require("clean-css"),
  win32 = process.platform === 'win32',
  crlf = win32 ? '\r\n' : '\n';

// to be refactored out in multiple files.

// Starting all it here for now

// ============================================================================
// TASKS
// ============================================================================

task.registerBasicTask('intro', 'Kindly inform the developer about the impending magic', function(data, name) {
  // Otherwise, print a success message.

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


task.registerBasicTask('clean', 'Wipe the previous build dirs', function(data, name) {
  var cb = this.async(),
    dirname = path.resolve(name);

  // Delete all files inside the folder
  task.helper('clean', dirname, function(err) {
    if(err) return fail.warn(err.message, err.errno || 3);
    cb();
  });

});

task.registerBasicTask('mkdirs', 'Prepares the build dirs', function(data, name) {
  var dirname = path.resolve(name);
  file.mkdir(dirname);

  var files = file.expand(['**']).filter(function(f) {
    // filter out files to exclude from <config:mkdirs:target>
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

task.registerBasicTask('css', 'Concats, replaces @imports and minifies the CSS files', function(data, name) {
  var files = task.helper('cssimport', file.expand(data));
  file.write(name, task.helper('mincss', files));
  log.writeln("File :file created".replace(':file', name));
});

task.registerBasicTask('rev', 'Automate the revving of assets filename', function(data, name) {
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

task.registerBasicTask('usemin', 'Replaces references to non-minified scripts / stylesheets', function(data, name) {
  var files = file.expand(data);

  files.map(file.read).forEach(function(content, i) {
    var p = files[i];
    log.subhead(p);
    log.writeln('switch from a regular jquery to minified');


    log.writeln('Update the HTML to reference our concat/min/revved script file');
    content = content.replace(/<!--\s*scripts concatenated[\d\w\s\W\n]*<!--\s*end scripts\s*-->/gm, function(match, prefix) {
      // hmm not that configurable, think of another way, but that'll be good for now
      var file = fs.readdirSync(path.resolve('publish/js')).filter(function(f) {
        return path.basename(f).split('.').slice(1).join('.') === 'scripts.js';
      })[0];

      // guess the relative prefix path from one of the script, needs rework obviously
      var prefix = match.match(/<script.+src=["'](.*)\/script.js["']\s*><\/script>/);
      prefix = (prefix && prefix[1]) || '';
      return '<script defer src=":file"></script>'.replace(':file', [prefix, file].join('/'));
    });

    log.writeln('Update the HTML with the new css filename');
    content = content.replace(/<link rel=["']?stylesheet["']?\shref=["']?(.*)\/style.css["']?\s*>/gm, function(match, prefix) {
      // same here
      var file = fs.readdirSync(path.resolve('publish/css')).filter(function(f) {
        return path.basename(f).split('.').slice(1).join('.') === 'style.css';
      })[0];

      return '<link rel="stylesheet" href=":file">'.replace(':file', [prefix, file].join('/'));
    });

    log.writeln('Update the HTML with the new img filename');
    content = content.replace(/<img.+src=['"](.+)\/([^\/]+)["'][^>]*>/, function(match, prefix, src) {
      // same here
      var file = fs.readdirSync(path.resolve('publish/img')).filter(function(f) {
        return path.basename(f).split('.').slice(1).join('.') === src;
      })[0];

      return '<img src=":src">'.replace(':src', [prefix, file].join('/'));
    });

    // write the new content to disk
    file.write(p, content);
  });

});

task.registerBasicTask('manifest', 'Generates manifest files automatically from static assets reference.', function(data, name) {
  // Otherwise, print a success message.
  log.writeln('not yet implemented');
});


// ============================================================================
// HELPERS
// ============================================================================

task.registerHelper('clean', function(dir, cb) {
  if(!cb) return rimraf.sync(dir);
  rimraf(dir, cb);
});


task.registerHelper("mincss", function(files) {
  return files ? files.map(function(filecontent) {
    return cleanCSS.process(filecontent);
  }).join("") : "";
});

// returns an array of files, in the order they appear as @imported
//
// Output a warning message for each invalid uri (eg, path refers to unexisting file)
task.registerHelper("cssimport", function(files) {
  // For each file content, let's lookup any @import statements
  // This is done by iterating through each file, and replacing these @import
  // statements by the actual content of the file.
  //
  // Process is recursive (and synchronous). All the magic happen in
  // replaceImports function.

  return files.map(function(name) {
    return replaceImports(name);
  });
});

task.registerHelper('md5', function(filepath) {
  var md5 = crypto.createHash('md5');
  md5.update(file.read(filepath));
  return md5.digest('hex');
});


var rUrl = /@import url\(['"]([^\)]+)['"]\)/g,
  rQuote = /@import "([^"]+)"/g,
  rSingle = /@import '[^']+'/g;

// Recursive css @imports replace helper.
function replaceImports(filepath, content) {
  var filecontent = file.read(filepath);

  var reg = rUrl.test(filecontent) ? rUrl :
    rQuote.test(filecontent) ? rQuote :
    rSingle.test(filecontent) ? rSingle :
    null;

  filecontent = filecontent.replace(reg, function(w, match) {
    var p = path.resolve(path.dirname(filepath), match);
    if(!path.existsSync(p)) {
      log.error('Invalid @import file → ' + match);
      return w;
    }

    return replaceImports(p);
  });

  return filecontent;
}