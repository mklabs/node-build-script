
var helpers = exports,
  fs = require('fs'),
  path = require('path'),
  grunt = require('grunt'),
  EventEmitter = require('events').EventEmitter;

helpers.task = function task(t, options) {
  if(options) fs.writeFileSync(path.join(__dirname, '../fixtures/h5bp/grunt.js'), [
    'config.init(',
    JSON.stringify(options, null , 2),
    ');'
  ].join('\n'));

  return function() {
    var em = new EventEmitter;
    grunt.tasks([t || 'default'], {
      config: options ? path.join(__dirname, '../fixtures/h5bp/grunt.js') : 'grunt.js',
      tasks: [path.join(__dirname, '../../tasks')],
      base: path.join(__dirname, '../fixtures/h5bp')
    }, em.emit.bind(em, 'success'));
    return em;
  }
}
