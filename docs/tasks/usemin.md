# Task - usemin

Replaces references ton non-optimized scripts / stylesheets into a
set of html files (or any template / views).

Usemin task is probably the trickiest one. It'll replace references to
non minified scripts / stylesheets to their optimized / versioned
equivalent.

```js
usemin: {
  files: ['publish/*.html']
}
```

In this configuration, it'll handle the replacement for any html files
located under the publish directory.

Right now the replacement is based on the filename parsed from content
and the files present in according directory (eg. looking up matching
revved filename into `output/` dir to know the sha generated).

If you'd like a little bit more flexibility, you can use "directives", some
special kind of html comments surrounding the part of html we want to replace
(original idea from [@necolas](https://github.com/necolas) in:
https://github.com/h5bp/html5-boilerplate/issues/831)

There is no need for JSDOM for this, this is plain regexp (JSDOM required
for data-build attributes).

Ex:

```html
<!-- build:css css/site.css -->
<link rel="stylesheet" href="css/style.css">
<!-- endbuild -->
```

Results in:

```html
<link rel="stylesheet" href="css/site.css">
```

A directive is composed of the following part:

```html
<!-- build:<target> <output> -->
... block ...
<!-- endbuild -->
```

* **`<target>`**
A known target is required (`css` or `js`). It'll namely allow you
to replace the html "block" with appropriate tag (eg. a `<link>` for
stylesheets, a `<script>` for js files, the task won't guess this from markup
for you)

* **`<output>`**
Path to the optimized asset. The html "block" is replaced with
according tag (depending on `<target>`) while replacing the src or href
attribute with the `<output>` value.

* **`... block ...`**
Anything inside the `<!-- build.. -->` and `<!-- endbuild -->` is replaced
depending on `<target>` and `<output>` values.

The resulting html is then passed through the global replace, looking up
matching revved filename in the output directory (defaults to `publish/`),
replacing references to their hash-prepended version.

This "directives" system will provide you a nice level of flexibility, and the
ability to be very descriptive on what gets replaced and by what.
