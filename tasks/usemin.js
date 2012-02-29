
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

task.registerBasicTask('usemin', 'Replaces references to non-minified scripts / stylesheets', function(data, name) {
  var files = file.expand(data),
    output = path.resolve(config('output')),
    cssdir = path.join(output, 'css'),
    imgdir = path.join(output, 'img'),
    jsdir = path.join(output, 'js');

  files.map(file.read).forEach(function(content, i) {
    var p = files[i];
    log.subhead(p);
    log.writeln('switch from a regular jquery to minified');

    log.writeln('Update the HTML to reference our concat/min/revved script files');
    content = content.replace(/<script.+src=['"](.+)["'][\/>]?><[\\]?\/script>/gm, function(match, src) {
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

    log.writeln('Update the HTML with the new css filename');
    content = content.replace(/<link rel=["']?stylesheet["']?\shref=['"](.+)\/([^\/"']+)["']\s*>/gm, function(match, prefix, src) {
      //do not touch external files
      if(prefix.match(/\/\//)) return match;

      var filename = path.basename((file.expand(path.join(config('output'), '**/*') + src)[0] || ''));

      // replace the output dir prefix
      filename = filename.replace(config('output'), '');

      // handle the relative prefix
      filename = [prefix, filename].join('/');

      // if file not exists probaly was concatenated into another file so skip it
      return filename ? '<link rel="stylesheet" href=":file">'.replace(':file', filename) : '';
    });

    log.writeln('Update the HTML with the new img filename');
    content = content.replace(/<img.+src=['"](.+)\/([^\/"']+)["'][\/>]?>/, function(match, prefix, src) {
      //do not touch external files
      if(prefix.match(/\/\//)) return match;

      var filename = path.basename((file.expand(path.join(config('output'), '**/*') + src)[0] || ''));

      // replace the output dir prefix
      filename = filename.replace(config('output'), '');

      // handle the relative prefix
      filename = [prefix, filename].join('/');

      // if file not exists probaly, just leave off the actual content
      return filename ? '<img src=":src">'.replace(':src', filename) : match;
    });

    // write the new content to disk
    file.write(p, content);
  });

});
