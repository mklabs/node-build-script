# Task - mkdirs

The mkdirs task is working in tandem with the clean one, and creates the
necessary build dirs.

```js
// the staging directory used during the process
staging: 'intermediate/',

// final build output
output: 'publish/',

// filter any files matching one of the below pattern during mkdirs task
exclude: 'build/** node_modules/** grunt.js package.json *.md'.split(' '),

mkdirs: {
  staging: '<config:exclude>',
  output: '<config:exclude>'
},
```

Just as the clean task, config subprop are used to create the
directories. A basic mapping is done in configuration to get back the
directory values, (eg. `config(task.target) --> config('staging')`).

Values for each is an array of files to filter, eg. they'll not be
copied over during the process. These are
[minimatch](https://github.com/isaacs/minimatch#readme) patterns.

## Helpers

### mkdirs

`mkdir` helper is basic wrapper around
[node-mkdirp](https://github.com/substack/node-mkdirp#readme).  Takes a
`directory` path to create, process is async if a valid callback
is passed in, otherwise sync process.

```js
task.helper('mkdir', dir, cb);
```

### copy

`copy` helper uses [ncp](https://github.com/AvianFlu/ncp#readme)
and [minimatch](https://github.com/isaacs/minimatch#readme) to copy
the files under the current directory to the specified `dir`,
optionnaly ignoring files specified by the `options.ignore` property.

`options.ignore` can be a String of space delimited glob patterns,
an Array of glob patterns, or a filter function.

This helper is asynchronous only. Paths are always relative to
current working directory.

- source     - Path to the source directory
- dest       - where the files will be copied to
- opts       - (optional) An Hash object with an `ignore` property
- cb         - callback to call on completion

```js
task.helper('copy', source, dest, opts, function(e) {
  if(e) log.error(e.stack || e.message);
  else log.ok();
  cb(!e);
});
```

