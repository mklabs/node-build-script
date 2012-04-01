# Task - min

[Read the grunt documentation on min built-in
task](https://github.com/cowboy/grunt/blob/master/docs/task_min.md#readme)

Min is another built-in grunt task that allows you to easily compress
JavaScript files through [UglifyJS](https://github.com/mishoo/UglifyJS/).

```js
min: {
  'publish/js/scripts.js': [ 'intermediate/js/scripts.js' ]
},
```

