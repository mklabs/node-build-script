
var helpers = exports,
  fs = require('fs'),
  path = require('path'),
  grunt = require('grunt'),
  EventEmitter = require('events').EventEmitter;

helpers.task = function task(t, config) {
  if(config) {
    config = typeof config === 'string' ? fs.readFileSync(config, 'utf8') : [
      'config.init(',
      JSON.stringify(config, null , 2),
      ');'
    ].join('\n');
  }

  return function() {
    if(config) fs.writeFileSync(path.join(__dirname, '../fixtures/h5bp/grunt.js'), config);
    var em = new EventEmitter;
    grunt.tasks([t || 'default'], {
      config: config ? path.join(__dirname, '../fixtures/h5bp/grunt.js') : 'grunt.js',
      tasks: [path.join(__dirname, '../../tasks')],
      base: path.join(__dirname, '../fixtures/h5bp')
    }, em.emit.bind(em, 'success'));
    return em;
  }
};
