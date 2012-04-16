
var path = require('path'),
  spawn = require('child_process').spawn;

var env = process.platform;

module.exports = function(grunt) {

  grunt.registerTask('docs', 'grunt h5bp plugin documentation', function(target) {
    // long running process
    var cb = this.async();
    var config = {
      base: path.join(__dirname, '../docs'),
      port: grunt.option('port') || 3000,
      browser: grunt.config('browser') || grunt.option('browser') || ''
    };

    var browser = config.browser ? config.browser :
      env === 'win32' ? 'explorer' :
      env === 'darwin' ? 'open' :
      'google-chrome';

    var app = grunt.helper('serve', config);

    app.on('start', function() {
      var open = spawn(browser, ['http://localhost:' + config.port]);
      open.on('error', function(er) { console.error(er); });
      open.on('exit', function(code) {
        if(code) grunt.warn('Something bad happend', code);
      });
    });
  });

};
