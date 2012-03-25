
var fs = require('fs'),
  path = require('path'),
  rjs = require('requirejs');

var plugin = module.exports;

// give it a name
plugin.name = 'link';

// give it some defaults
plugin.defaults = {
  dir: process.cwd(),
  output: 'css/style.min.css'
};

// and the main plugin handler, mixed in jsdom's jquery as $.fn.pluginame
plugin.handler = function link($, options, cb) {
  options = options || {};

  // size of the passed in collection,
  // used to emit `success` on last iteration.
  var ln = this.length;

  // reg cache
  var rAbs = /\/\//;

  // don't act on zero-element
  if(!ln) {
    cb();
    return this;
  }

  // default configuration here..
  options.whatev = options.whatev || 'whatev';

  // will hold the concatenated script,
  // in the order they appear in the collection
  var files = [];

  return this.each(function(i, target) {

    var el = $(this),
      last = ln === (i + 1),
      src = el.attr('href'),
      file = path.resolve(options.dir, src),
      abs = rAbs.test(src);

    // don't handle external files
    if(abs) {
      if(last) cb();
      return;
    }

    if(!path.existsSync(file)) return cb(new Error('no ' + src));

    var output = el.data('build') || options.output;

    // have rjs deal with import inlines, plus file writes
    var config = options.rjs || options.requirejs || {
      optimizeCss: 'standard.keepLines'
    };
    config.out = output;
    config.cssIn = file;
    log.writeln((' › writing to output ' + output).bold);
    rjs.optimize(config, function(res) {
      if(!last) return el.remove();

      // update dom tree accordingly
      el.attr('href', output);
      cb(null, res);
    });
  });
};

