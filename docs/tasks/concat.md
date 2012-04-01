# Task - concat

[Read the grunt documentation on concat built-in
task](https://github.com/cowboy/grunt/blob/master/docs/task_concat.md#readme)

Concat is a built-in grunt task and allows you to easily concatenate a
list of files.

      concat: {
        'intermediate/js/scripts.js': [ 'js/plugins.js', 'js/script.js' ],
        'intermediate/css/style.css': [ 'css/*.css' ]
      },

The mechanism is fairly simple:

* config subprop are the destination files.
* config subprop values are an array of glob patterns that will be
  expanded in the corresponding file arrays.

Each "fileset" is then concat into one file, the destination one.

If order is important, you might need to be a little more explicit here
and specify each script to be included (as glob patterns won't ensure
this). Actually, you can see this in action here with the
`intermediate/js/scripts.js` file.
