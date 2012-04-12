
var path = require('path'),
  help = require('grunt-help');

module.exports = function(grunt) {

  // Help configuration fot the grunt-help plugin
  // >> https://github.com/mklabs/grunt-help

  var config = {
    base: path.join(__dirname, '../docs'),
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
  };

  // load the external plugins
  //
  // todo: had quite a bit of difficulties passing a set of defaults conguration
  // to the plugin. Sure it can be done with grunt.config after being inited,
  // but as soon as grunt will parse a gruntfile with grunt.initConfig, we'll
  // lose the `help` config property.
  //
  // So, we're loading with raw require statements instead of loadNpmtTasks, not ideal
  // but the use case is kinda special. Maybe it can be done in a different and nicer way?
  //

  var dirpath = require.resolve('grunt-help');

  // load the task, pass in grunt reference
  help.task(grunt, config);

  // grunt.task.loadNpmTasks('grunt-help');

};
