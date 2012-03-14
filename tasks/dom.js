
var fs = require('fs'),
  path = require('path'),
  jsdom = require('jsdom');

// the jQuery file content passed in jsdom
var jquery = fs.readFileSync(path.join(__dirname, '../support/jquery.min.js'), 'utf8');

//
// ### Dom task
//
// > https://github.com/h5bp/node-build-script/wiki/jsdom-implementation
//
// **note**: should probably not write to original files, but do a full copy of
// current directory and operates on top of that staging dir.
task.registerTask('dom', 'Fancy dom-based build system', function() {
  var conf = config('dom'),
    files = file.expand(conf.files),
    cb = this.async();

  log.writeln('About to process following files\n » ' + log.wordlist(files, '\n » '));

  var selectors = Object.keys(conf).filter(function(key) { return key !== 'files'; });
  log.writeln('with the following set of selectors\n » ' + log.wordlist(selectors, '\n » '));

  var plugins = selectors.map(function(key) {
    return {
      el: key,
      plugin: conf[key]
    }
  });

  (function run(files) {
    var f = files.shift();
    if(!f) return cb();

    task.helper('dom:plugin', f, plugins, function(err, body) {
      if(err) return fail.warn(err);
      // Write the new content, and keep the doctype safe (innerHTML returns
      // the whole document without doctype).

      // temporary writing to filename.html.test to not alter original file
      log.subhead(' › writing to output ' + f + '.test');
      fs.writeFileSync(f + '.test', '<!doctype html>' + body);

      log.subhead(' ✔ ' + f);
      run(files);
    });
  })(files);

});

// name will probably change
task.registerHelper('dom:plugin', function(f, plugins, cb) {
  log.subhead('About to process ' + f);

  var ln = plugins.length;
  processFile(f, function(err, window) {
    if(err) return cb(err);

    var $ = window.$;

    // augment jQuery namespace accordingly with passed in plugins
    plugins.forEach(function(it) {
      var plugin = it.plugin;
      // silent for now
      // if(!plugin.name) return cb(new Error('Require plugin.name missing'));
      // if(!plugin.handler) return cb(new Error('Require plugin.handler missing'));
      // if(typeof plugin.handler !== 'function') return cb(new Error('plugin.handler must be a function'));
      if(!plugin.name || !plugin.handler) return;
      // should do this under a single facade do reduce namespace collision
      $.fn[plugin.name] = plugin.handler;
    });

    plugins.forEach(function(it) {
      var el = it.el,
        plugin = it.plugin,
        name = plugin.name;

      log.writeln(' » handle ' + el);
      if(!$.fn[name]) return next();;

      var options = $.extend({}, plugin.defaults);
      $(el)[name]($, options, function(err) {
        if(err) return cb(err);
        next();
      });
    });

    function next() {
      if(--ln) return;
      cb(null, window.document.innerHTML, window);
    }
  });

});



// ## Helpers
//
// The process file function is the asyns.forEach iterator function.  It tries
// to read the file content from the file system, and bootstrap a jsdom
// environement for each of these.
//
// The processor might have change the dom tree. The content of
// `window.document.innerHTML` is then used to replace the original file.
//

function processFile(file, cb) {
  fs.readFile(file, 'utf8', function(err, body) {
    if(err) return cb(err);
    jsdom.env({
      html: body,
      src: [jquery],
      done: cb
    });
  });
}

