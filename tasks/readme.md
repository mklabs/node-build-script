## Tasks

Initiated the update to grunt 0.3.x api.

* Reworked the tasks dir have different "load targets"

* **dom/** contains tasks related to the dom based build system.

* **support/** contains tasks related to normal build system, eg.
  relying on informations found in the gruntfile.

To include any of these tasks in your grunt setup, you might want to do
something like this.

1. First, install the project locally.
2. Use `h5bp.load` with either `dom` or `support` to load appropriate
tasks in your gruntfile.

Like so:

```js
var h5bp = require('node-build-script');

module.exports = function(grunt) {

  grunt.initConfig({ ... });

  // load the tasks, give it your grunt

  // will include every tasks
  h5bp.load(grunt);

  // will include just the subset you need
  h5bp.load(grunt, 'dom');

  // interrested in loading one single particular task?
  h5bp.load(grunt, 'support/css');

};

````

---

> not up to date

You'll find below a basic description and documentation for each task
that the build script use, built-in or custom one. For each of these,
we'll detail the task configuration and how to tweak this.

### intro

Nothing to worry about here, this task will just write to the console
some info on the build script.

### clean

The clean task will remove and wipe out any previous build dirs (which
are ./intermediate and ./publish)

    clean: '<config:mkdirs>',

The `<config:mkdirs>` placeholder is a grunt directive. It's great to
dry-out the configuration. It'll simply replace this by the mkdirs
config values.

The clean will be triggered for each config subprop (intermediate/ and
publish/) and remove the dirs accordingly.

### mkdirs

The mkdirs task is working in tandem with the clean one, and creates the
necessary build dirs.

     mkdirs: {
        intermediate: 'build/** node_modules/** intermediate/** publish/**
    grunt.js package.json *.md'.split(' '),
        publish: 'build/** node_modules/** intermediate/** publish/**
    grunt.js package.json *.md'.split(' ')
      },

Just as the clean task, config subprop are used to create the
directories. Values for each is an arry of file to filter, eg. they'll
not be copied over during the process.

### concat

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

### css

The css tasks will handle stylesheets optimizations. These optimizations
include:

* CSS `@import` statements inlining (borrowed to r.js)
* CSS minification (through
  [CSSMin](https://github.com/GoalSmashers/clean-css), todo consider
using [sqwish](https://github.com/ded/sqwish))

Here's the basic configuration used:

     css: {
        'publish/css/style.css': [ 'css/style.css' ]
      },

Just as the concat / min task, the config subprop is used as the
destination files, any expanded files in the config subprob value will
be optimized and concat'd into the destination file.

### min

Min is another built-in grunt task that allows you to easily compress
JavaScript files through [UglifyJS][uglify].

    min: {
      'publish/js/scripts.js': [ 'intermediate/js/scripts.js' ]
    },

Really similar to the concat tasks, config subprop are used as
destination files, expanded files from config values are passed through
uglify.

### rev

The rev task is a really simple one that will read the file content,
generate a hash and prepend that hash to the original filename.

    rev: {
      js: ['publish/js/*.js'],
      css: ['publish/css/*.css'],
      img: ['publish/img/*']
    },

From this configuration example, the rev task will iterate through each
expanded files for js / css / img subtasks and generate a hash from
their content and rename each file accordingly.

A `scripts.js` file will be renamed into something like
`12345678.scripts.js`. The hash will change only when the content
change.

### usemin

Usemin task is probably the trickiest one. It'll replace references to
non minified scripts / stylesheets to their optimized / versioned
equivalent.

    usemin: {
      files: ['publish/*.html']
    },

In this configuration, it'll handle the replacement for any html files
located under the publish directory.

### serve

Serve is a utility task that will spawn a local http server on top of
generated build dirs, intermediate/ and publish/.

intermediate/ will basically include any files that were concat'd, but
not minified / versioned. publish/ is the final build results.

    serve: {
      intermediate: { port: 3000 },
      publish: { port: 3001 }
    },

The only configurable option here is the port, but other relevant config
may be added soon (logs format, hostname, should serve dirs as well,  etc.)

### watch

The watch task is a built-in grunt task and allows you to run predefined
tasks whenever watched files change.

Basic watch configuration for the build script is as follows:

    watch: {
      files: ['js/*.js', 'css/**'],
      tasks: 'default'
    },

There is a special watch configuration for the reload task:

    watch: {
      files: ['js/*.js', 'css/**'],
      tasks: 'default',

      reload: {
        files: ['js/*.js', 'css/**'],
        tasks: 'default emit'
      }
    },

Only differences is that it'll also trigger the `emit` task at the end
of the build script (and reload your pages &#9731;)

### connect

The connect is a special little utility task working in tandem with the
watch one.

It's a slight variation of the serve command, but includes / injects
some socket.io magic to be able to reload any opened webpage in your
browsers.

Basically, the idea is that anytime you change a watched files
(js/css/templates, etc.), a new build is triggered and an event is
emitted back to any connected clients to reload pages automatically.

    connect: {

      intermediate: {
        port: 3000,
        logs: 'dev',
        dirs: true
      },

      publish: {
        port: 3001,
        logs: 'default',
        dirs: true
      }

    }

## H5BP Build configuration

For what it's worth, here's the basic current configuration for the
build script, which is located in repo's root.

You may edit this configuration by creating a grunt.js file in the
current working directory and tweak any configuration values below. The
binary will lookup for this file, and fallback accordingly to the
default one if it wasn't able to find one.

    // This is the main html5-boilerplate build configuration file.
    //
    //
    //    task.registerTask('default', 'intro clean mkdirs usemin concat min css manifest copy');

    config.init({

      clean: '<config:mkdirs>',

      mkdirs: {
        intermediate: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' '),
        publish: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' ')
      },

      concat: {
        'intermediate/js/scripts.js': [ 'js/plugins.js', 'js/script.js' ],
        'intermediate/css/style.css': [ 'css/*.css' ]
      },

      css: {
        'publish/css/style.css': [ 'css/style.css' ]
      },

      min: {
        'publish/js/scripts.js': [ 'intermediate/js/scripts.js' ]
      },

      rev: {
        js: ['publish/js/*.js'],
        css: ['publish/css/*.css'],
        img: ['publish/img/*']
      },

      usemin: {
        files: ['publish/*.html']
      },

      manifest: '<config:usemin>',

      lint: {
        files: ['js/*.js'],
        build: ['grunt.js', 'tasks/*.js']
      },

      watch: {
        files: ['js/*.js', 'css/**', '*.html'],
        tasks: 'default',

        reload: {
          files: '<config:watch.files>',
          tasks: 'default emit'
        }
      },

      serve: {
        intermediate: { port: 3000 },
        publish: { port: 3001 }
      },

      connect: {
        intermediate: {
          hostname: 'localhost',
          port: 3000,
          logs: 'dev',
          dirs: true
        },
        publish: {
          hostname: 'localhost',
          port: 3001,
          logs: 'default',
          dirs: true
        }
      }
    });

    // Run the following tasks...
    task.registerTask('default', 'intro clean mkdirs concat css min rev usemin manifest');

    task.registerTask('reload', 'connect watch:reload');
