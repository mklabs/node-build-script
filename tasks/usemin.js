
var fs = require('fs'),
  path = require('path');

//
// ### Tasks
//
task.registerBasicTask('usemin', 'Replaces references to non-minified scripts / stylesheets', function(data, name) {
  var files = file.expand(data);

  files.map(file.read).forEach(function(content, i) {
    var p = files[i];
    log.subhead(p);
    log.writeln('switch from a regular jquery to minified');


    log.writeln('Update the HTML to reference our concat/min/revved script files');
    content = content.replace(/<script.+src=['"](.+)\/([^\/"']+)["'][\/>]?><\/script>/mg, function(match, prefix, src) {

      if(prefix.match(/\/\//)){
        //do not touch external files
        return match;
      }
      var fileName = file.expand('publish/js/**/*' + src)[0];
      if(fileName){
        fileName = fileName.replace('publish', '');
      return '<script defer src=":file"></script>'.replace(':file', fileName);
      }
      //if file not exists probaly was concatenated into another file so skip it
      return '';

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
    content = content.replace(/<img.+src=['"](.+)\/([^\/"']+)["'][\/>]?>/, function(match, prefix, src) {
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
