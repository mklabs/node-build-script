
var path = require('path'),
  exec = require('child_process').exec;

var env = process.platform;

module.exports = function(grunt) {

  grunt.registerTask('docs', 'grunt h5bp plugin documentation', function(target) {
    // path to the documentation page
    var docs = path.join(__dirname, '../docs/index.html');

    // in case browser to use is setup in config or via --browser flag
    var gruntBro = grunt.config('browser') || grunt.option('browser') || '';

    // async task
    var cb = this.async();

    // depending on env.. try to guess the correct browser
    var browser = gruntBro ? gruntBro :
      env === 'win32' ? 'explorer' :
      env === 'darwin' ? 'open' :
      'google-chrome';

    /// XXX should which the browser, warn user if it fails and preven the
    // browser exec

    // spawn and forget, would probably ends up with no browser opening
    // but output to console webserver url.
    exec(browser + ' ' + docs, function(err) {
      if(err) {
        // XXX to be removed in grunt0.4.x
        grunt.log.error(err);
        return cb(false);
      }
    });
  });

};
