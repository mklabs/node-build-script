
The `dom` task is a special task using `jsdom` to do some nasty thing to
a bunch of html files. The idea is to rely on a set of selectors and
plugins.

These plugins are special jQuery plugins that can use the node api to do
their task.

The following plugins are implemented

* **css** Relies on @import statement mainly which are inlined (with
  nested path rewrite) to serve a single optimized stylesheet.

* **js** Concats, minify through uglify and serve a single concat'd /
  minified script.

Each plugin is able to modify the DOM tree to replace references to
optimized files.

## Usage

Using the `h5bp` executable:

    h5bp dom

Programmatically:

    npm install node-build-script

And then, in a file loaded by grunt (usually `grunt.js` file)

    require('node-build-script').load('dom');


## Configuration

Minimal, most of the configuration is derived from html markup, by using
special semantics on `data-*` attributes, probably always namespaced to
`data-build-*`.

    config.init({
        ...,

        dom: {
            files: ['*.html', 'views/**/*.html'],
            'script[data-build]'    : require('node-build-script/plugins/script'),
            'link'                  : require('node-build-script/plugins/link'),
            'img'                   : require('node-build-script/plugins/img'),
            'script, link, img'     : require('node-build-script/plugins/rev')
        },

        ...
    });

* **files**: list of glob pattern to expand. The files in the resulted
  array are then passed through each of the processors.

* **script, link, img** a list of selectors may be associated with
  plugins that will be executed with the set of matching DOM elements.

selectors / plugins are run sequentially, and the DOM tree is modified
all allong the way through the last selector / plugin couple. Read that
the selectors result depends on the modified DOM tree from previous
processors.

One can use a totally different set of selectors, with custom plugin,
ex.

* just `script`, `link` and `img`
* or `.js-plugin`
* or `script[src*="jquery"]` or `script[src*=backbone]`
* `script[data-main]` --> triggers a r.js build

## Plugin API

Plugins are valid commonjs package and should expose a single function,
a jQuery like plugin that will be run with the associated set of DOM
elements for a given selector.

Plugins needs to export a few things:

* **name** is the plugin name and used to extend the jQuery namespace,
  eg its prototype `$.fn`
* **defaults** a Hash object of default configuration value.
* **handler** the main function, that is the jQuery plugin
  implementation.

Here's the `link` plugin:

```javascript
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
```


One could think do to some crazy stuff on their html files, and use a
jQuery like api mixed here and there with the node api to handle all
sort of things with a bunch of custom plugins, on an arbitrary set of
selectors.


