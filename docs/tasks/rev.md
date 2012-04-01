# Task - rev

The rev task is a really simple one. Its role is to read the content of
a given file, generate a hash and prepend that hash to the original
filename.

```js
rev: {
  js: ['publish/js/*.js'],
  css: ['publish/css/*.css'],
  img: ['publish/img/*']
},
```

From this configuration example, the rev task will iterate through each
expanded files for js / css / img subtasks and generate a hash from
their content and rename each file accordingly.

A `scripts.js` file will be renamed into something like
`12345678.scripts.js`. The hash will change only when the content
change.

## Helpers

### hash

`hash` helper takes care of files revving, by renaming any files in the
given `files` pattern(s), with passed in `options`.

- files      - String or Array of glob pattern
- options    - (optional) An Hash object where:
  - cwd     - Base directory to work from, glob patterns are
  prepended to this path.

```js
task.helper('hash', files, options);
```

### md5

`md5` helper is a basic wrapper around crypto.createHash, with given
`algorithm` and `encoding`. Both are optional and defaults to `md5` and
`hex` values.

```js
task.helper('md5', file, algorithm, encoding);
```
