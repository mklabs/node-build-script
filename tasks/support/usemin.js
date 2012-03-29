
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
    log = grunt.log;

  task.registerMultiTask('usemin', 'Replaces references to non-minified scripts / stylesheets', function() {

    var name = this.target,
      data = this.data,
      files = file.expand(data),
      output = path.resolve(config('output'));

    files.map(file.read).forEach(function(content, i) {
      var p = files[i];
      log.subhead(p);
      log.writeln('switch from a regular jquery to minified');

      // convert content buffer into raw string before processing
      content = content.toString();

      log.writeln('Update the HTML to reference our concat/min/revved script files');
      content = task.helper('replace', content, /<script.+src=['"](.+)["'][\/>]?><[\\]?\/script>/gm);

      log.writeln('Update the HTML with the new css filename');
      content = task.helper('replace', content, /<link rel=["']?stylesheet["']?\shref=['"](.+)["']\s*>/gm);

      log.writeln('Update the HTML with the new img filename');
      content = task.helper('replace', content, /<img.+src=['"](.+)["'][\/>]?>/);

      // write the new content to disk
      file.write(p, content);
    });

  });

  task.registerHelper('replace', function(content, regexp) {
    return content.replace(regexp, function(match, src) {
      //do not touch external files
      if(src.match(/\/\//)) return match;
      var basename = path.basename(src);
      var dirname = path.dirname(src);

      var filename = path.basename((file.expand(path.join(config('output'), '**/*') + basename)[0] || ''));

      // replace the output dir prefix
      filename = filename.replace(config('output'), '');

      // handle the relative prefix (with always unix like path even on win32)
      filename = [dirname, filename].join('/');

      // if file not exists probaly was concatenated into another file so skip it
      return filename ? match.replace(src, filename) : '';
    });
  });
};
