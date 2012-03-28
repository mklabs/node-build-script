
var path = require('path'),
  rimraf = require('rimraf'),
  cleanCSS = require("clean-css"),
  rUrl = /@import url\(['"]([^\)]+)['"]\)/g,
  rQuote = /@import "([^"]+)"/g,
  rSingle = /@import '[^']+'/g;

//
// ### Tasks
//

task.registerMultiTask('css', 'Concats, replaces @imports and minifies the CSS files', function(data, name) {
  var files = task.helper('cssimport', file.expand(this.data));
  file.write(this.target, task.helper('mincss', files));
  log.writeln("File :file created".replace(':file', this.target));
});

//
// ### Helpers
//

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
