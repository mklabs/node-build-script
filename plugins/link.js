
var fs = require('fs'),
  path = require('path');

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
    var el = $(this); // === $(target)

    var src = el.attr('href'),
      last = ln === (i + 1),
      file = path.resolve(options.dir, src);

    if(!path.existsSync(file)) return cb(new Error('no ' + src));
    files = files.concat(fs.readFileSync(file, 'utf8'));

    // remove dom element from dom tree, when not on last loop
    if(!last) return el.remove();

    var output = el.data('build') || options.output;
    // update dom tree accordingly
    el.attr('href', output);

    // finally, write to destination output
    log.writeln((' › writing to output ' + output).bold);
    task.helper('mkdir', path.dirname(path.resolve(output)));
    fs.writeFile(output, task.helper('mincss', files), cb);
  });
};

