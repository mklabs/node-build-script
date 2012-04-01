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

## Helpers

> todo
