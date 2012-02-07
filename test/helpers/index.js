
var helpers = exports,
  path = require('path'),
  grunt = require('grunt'),
  EventEmitter = require('events').EventEmitter;

helpers.task = function task(t) { return function() {
  var em = new EventEmitter;
  grunt.tasks([t || 'default'], {
    tasks: [path.join(__dirname, '../../tasks')],
    base: path.join(__dirname, '../fixtures')
  }, em.emit.bind(em, 'success'));
  return em;
}}
