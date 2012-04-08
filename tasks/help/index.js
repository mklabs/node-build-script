
var path = require('path');

module.exports = function(grunt) {

  // load the external plugins
  // todo: maybe an issue with global-plugin (eg. running `h5bp`
  // instead of `grunt`) and when done from outside the project dir.
  // the tasks from an inner plugin does not seem to load in that
  // context.
  grunt.task.loadNpmTasks('grunt-help');

  // Help configuration fot the grunt-help plugin
  // >> https://github.com/mklabs/grunt-help
  grunt.config('help', {
    base: path.join(__dirname, '../../docs'),
    // additional docs page to lookup for the help task
    files: '**/*.md',

    delimiter: ' ',

    // prefix output for page list
    prefix: 'h5bp help ',

    htmlPath: 'https://github.com/h5bp/node-build-script/wiki/:page',

    // the rename handler, dealing with custom delimiter conversion
    // back to urlpath, and in our case to special file renaming
    // (basename-->title)
    rename: function(name, viewer) {
      var base = grunt.config('help.base'),
        browser = viewer === 'browser';

      name = name.replace(/\s+/, '/');

      // find the relative doc in md
      var file = grunt.file.expandFiles(path.join(base, '**/*.md')).map(function(file) {
        if(!browser) return file.replace(base, '').replace(/^(\/)|(\\)/g, '').toLowerCase();
        return path.basename(file).replace(path.extname(file), '').toLowerCase();
      }).filter(function(file) {
        if(!browser) return file === name;
        return file === path.basename(name).replace(path.extname(name), '');
      })[0];

      return browser ? file : path.join(base, file);
    }
  });

};
