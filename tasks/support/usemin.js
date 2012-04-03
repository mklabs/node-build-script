
var fs = require('fs'),
  path = require('path');

//
// ### Usemin Task
//
// Replaces references ton non-optimized scripts / stylesheets into a
// set of html files (or any template / views).
//
// Right now the replacement is based on the filename parsed from
// content and the files present in accoding dir (eg. looking up
// matching revved filename into `output/` dir to know the sha
// generated).
//
// Todo: Use a file dictionary during build process and rev task to
// store each optimized assets and their associated sha1.
//

module.exports = function(grunt) {

  var task = grunt.task,
    config = grunt.config,
    file = grunt.file,
    log = grunt.log,
    linefeed = grunt.utils.linefeed;

  task.registerMultiTask('usemin', 'Replaces references to non-minified scripts / stylesheets', function() {

    var name = this.target,
      data = this.data,
      files = file.expand(data),
      output = path.resolve(config('output'));

    files.map(file.read).forEach(function(content, i) {
      var p = files[i];
      log.subhead('usemin - ' + p);

      // make sure to convert back into utf8, `file.read` when used as a
      // forEach handler will take additional arguments, and thus trigger the
      // raw buffer read
      content = content.toString();

      // todo fallback to the usemin replace we have if no sections were found.
      var blocks = getBlocks(content);

      //
      // {
      //    'css/site.css ':[
      //      '  <!-- build:css css/site.css -->',
      //      '  <link rel="stylesheet" href="css/style.css">',
      //      '  <!-- endbuild -->'
      //    ],
      //    'js/head.js ': [
      //      '  <!-- build:js js/head.js -->',
      //      '  <script src="js/libs/modernizr-2.5.3.min.js"></script>',
      //      '  <!-- endbuild -->'
      //    ],
      //    'js/site.js ': [
      //      '  <!-- build:js js/site.js -->',
      //      '  <script src="js/plugins.js"></script>',
      //      '  <script src="js/script.js"></script>',
      //      '  <!-- endbuild -->'
      //    ]
      // }
      //

      // handle blocks
      Object.keys(blocks).forEach(function(key) {
        var block = blocks[key].join(linefeed),
          parts = key.split(':'),
          type = parts[0];
          target = parts[1];

        content = task.helper('usemin', content, block, target, type);
      });

      // handle revving, each script / link tags are searching for a
      // matching file in output dir, replacing the href/src with their
      // hash-prepended version.
      content = task.helper('usemin:replace', content);

      // write the new content to disk
      file.write(p, content);
    });

  });

  task.registerHelper('usemin', function(content, block, target, type) {
    target = target || 'replace';
    return task.helper('usemin:' + type, content, block, target);
  });

  task.registerHelper('usemin:css', function(content, block, target) {
    var indent = (block.split(linefeed)[0].match(/^\s*/) || [])[0];
    return content.replace(block, indent + '<link rel="stylesheet" href="' + target + '">');
  });

  task.registerHelper('usemin:js', function(content, block, target) {
    var indent = (block.split(linefeed)[0].match(/^\s*/) || [])[0];
    return content.replace(block, indent + '<script src="' + target + '"></script>');
  });

  task.registerHelper('usemin:replace', function(content) {
    log.writeln('Update the HTML to reference our concat/min/revved script files');
    content = task.helper('replace', content, /<script.+src=['"](.+)["'][\/>]?><[\\]?\/script>/gm);

    log.writeln('Update the HTML with the new css filename');
    content = task.helper('replace', content, /<link rel=["']?stylesheet["']?\shref=['"](.+)["']\s*>/gm);

    log.writeln('Update the HTML with the new img filename');
    content = task.helper('replace', content, /<img.+src=['"](.+)["'][\/>]?>/);
    return content;
  });

  task.registerHelper('replace', function(content, regexp) {
    return content.replace(regexp, function(match, src) {
      //do not touch external files
      if(src.match(/\/\//)) return match;
      var basename = path.basename(src);
      var dirname = path.dirname(src);

      var filepath = file.expand(path.join(config('output'), '**/*') + basename)[0];

      // not a file in output, skip it
      if(!filepath) return match;

      var filename = path.basename(filepath);
      // replace the output dir prefix
      filename = filename.replace(config('output'), '');
      // handle the relative prefix (with always unix like path even on win32)
      filename = [dirname, filename].join('/');
      // if file not exists probaly was concatenated into another file so skip it
      return filename ? match.replace(src, filename) : '';
    });
  });
};


//
// Helpers: todo, register as grunt helper
//

// start build pattern --> <!-- build:[target] output -->
// var regbuild = /^\s*<!--\s*build\:\s(\w+)\s([\w\d\.\-_]+)\s*\]\]\s*-->/;
var regbuild = /<!--\s*build:(\w+)\s*(.+)\s*-->/;

// end build pattern -- <!-- endbuild -->
// var regend = /\s*<!--\s*\[\[\s*endbuild\s*\]\]\s*-->/;
var regend = /<!--\s*endbuild\s*-->/;

function getBlocks(body) {
  var lines = body.replace(/\r\n/g, '\n').split(/\n/),
    block = false,
    sections = {},
    last;

  lines.forEach(function(l) {
    var build = l.match(regbuild),
      endbuild = regend.test(l);

    if(build) {
      block = true;
      sections[[build[1], build[2].trim()].join(':')] = last = [];
    }

    // switch back block flag when endbuild
    if(block && endbuild) {
      last.push(l);
      block = false;
    }

    if(block && last) {
      last.push(l);
    }
  });

  return sections;
}
