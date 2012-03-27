plugins - link
==============

This plugin is run, in the default setup, with the following
configuration:

    dom: {
      files                   : ['*.html'],
      options: {},
      'link'                  : require('./plugins/link'),
    },

It uses [r.js](https://github.com/jrburke/r.js) to optimize a single css
file, and properly handle the `@import` statements you might have.

* http://requirejs.org/docs/optimization.html#onecss

Default optimization options for rjs are as follows:

* `optimizeCss='standard.keepLines'`

The output is based on `data-build` from the `<link>` tag, or defaults
to `css/style.min.css`.

Options
-------

* **dir** base directory to work from

* **output** default output destination, if not defined through
  `data-build`.

* **rjs** requirejs css optimization option.


