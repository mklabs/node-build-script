# Task - css

The css tasks will handle stylesheets optimizations. These optimizations
include:

* CSS `@import` statements inlining (borrowed to r.js)
* CSS minification (through
  [CSSMin](https://github.com/GoalSmashers/clean-css), todo consider
using [sqwish](https://github.com/ded/sqwish), probably through
[grunt-css](https://github.com/jzaefferer/grunt-css))

Here's the basic configuration:

```js
css: {
  'publish/css/style.css': [ 'css/style.css' ]
},
```

Just as the concat / min task, the config subprop is used as the
destination files, any expanded files in the config subprob value will
be optimized and concat'd into the destination file.

The `css` task works pretty much the same as grunt's min task. The task
target is the destination, data is an array of glob patterns. These
files are concataned and run through [requirejs
optimizer](http://requirejs.org/docs/optimization.html#onecss) to handle
@import inlines in CSS files.

## Helpers

### mincss

`mincss` basic utility to concat CSS files and run them through
[cleanCSS](https://github.com/GoalSmashers/clean-css), might opt to use
[https://github.com/jzaefferer/grunt-css] plugin. Takes an array of
files to concat and minified. The minificaton only happens if the
`options.nocompress` value is not set to `true` (default is `false`)

```js
var css = task.helper('mincss', files, options));
```

### rjs:optimize:css

`rjs:optimize:css` is an helper using rjs to optimize a single file,
mainly to properly import multi-level of @import statements, which can be
tricky with all the url rewrites.

file     - Path to the css file to optimize
options  - (optional) rjs configuration
cb       - callback function to call on completion

```js
task.helper('rjs:optimize:css', cssIn, this.async());
```

