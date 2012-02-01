H5BP Build Script: A node-based website optimization system
===========================================================

The h5bp build script based on ant has been ported to use node as a build tool.

There was a first attempt using cake and coffeescript to do that. This port has been itself ported to use grunt instead. Here we'll go through grunt usage and the h5bp build script documentation based on it.

## Features

Does the following things (not necessarily in the same order):

* Concats / Compresses JS
* Concats / Compresses CSS
* Inlice CSS imports
* Renames JS/CSS to prepend a hash of their contents for easier versioning
* Does the necessary regex replacements in html files and templates
* Retriggers the build script on file changes (watch mode &#10084;)
* Automatically reload the page in your browsers whenever watched files change, through some socket.io magic.

## Requirements

In order to successfully use this you will need:

* node <= 0.6.7
* npm

You should be able to use it on:

* OSX
* Unix
* Windows (watched files need further work, but we'll get there)

## Install instructions

Install can be done in a few different ways, pick the one that suits you
best.

### git clone / npm install

Clone or download this repo. Then, `cd` into it and run the `npm
install` command.

    # will most likely change to map the new location / repo / branch
    git clone git://github.com/mklabs/html5-boilerplate.git

    cd html5-boilerplate/

    # additionnal checkout to the correct branch step
    git checkout -b gruntify origin/gruntify

    # install the dependencies

    # locally to play with it from the repo
    npm install

    # or globally, to install the h5bp binary
    npm install -g

### npm install tar.gz

Note that all of these can be shorten to one single command, very much
like if it was published on npm. Append a `-g` flag if you'd like to
install globally and have the h5bp binary installed.

    npm install https://github.com/mklabs/html5-boilerplate/tarball/gruntify

Proxies don't like redirections, if you get problem if this command, try
this instead:

    npm install http://nodeload.github.com/mklabs/html5-boilerplate/tarball/gruntify

### Download the build script with all dependencies built-in

*(todo)* In order to get you started even easily, there's a special
branch with all the node_modules installed and commited in the
repository.

Note that this is provided mainly as a conveniency, if you get problem
installing the dependencies through `npm install`. But really, the
recommanded way to grab the dependencies is through npm usage.

##### Uninstall

You may want to uninstall the globally installed package by running the
following command:

    npm uninstall html5-boilerplate -g

## Usage

Once installed and everything setup, you'll be able to run the following
command, and get the according ouptut:

    $ h5bp --help

    grunt: a command line build tool for JavaScript projects.

    Usage
     h5bp [options] [task [task ...]]

    Options
     --help, -h     Display this help text.
     --base, -b     Specify an alternate base path (by default, all file paths are
                    relative to the config file).
     --color        Colored output (default). For no colors, use --no-color.
     --config, -c   Specify an alternate "grunt.js" config file.
     --debug, -d    Enable debugging mode for tasks that support it, along with
                    detailed error stack dumps.
     --force, -f    A way to force your way past warnings. Want a suggestion? Don't
                    use this option, fix your code.
     --tasks, -t    Additional directory paths to scan for task files.
     --write        Write files (default). For a dry run, use --no-write.
     --verbose, -v  Verbose output. Lots more stuff in the console.

    Tasks
     min            Minify files with UglifyJS. *
     concat         Concatenate files. *
     test           Run unit tests. *
     lint           Validate files with JSHint. *
     watch          Run predefined tasks whenever watched files change.
     intro          Kindly inform the developer about the impending magic *
     mkdirs         Prepares the build dirs *
     clean          Wipe the previous build dirs *
     css            Concats, replaces @imports and minifies the CSS files *
     rev            Automate the revving of assets filename *
     serve          Spawns up a local http server *
     foo            A basic tasks that emits event over socket.io *
     connect        Spawns up a local http server *
     usemin         Replaces references to non-minified scripts / stylesheets *
     default        Alias for "lint:build intro clean mkdirs concat css min
     rev            usemin manifest serve" tasks.
     nolint         Alias for "intro clean mkdirs concat css min rev usemin manifest" tasks.
     connect-watch  Alias for "connect watch:reload" tasks.

    Tasks run in the order specified. Arguments may be passed to tasks that accept
    them by using semicolons, like "lint:files". Tasks marked with * are "basic
    tasks" and will iterate over config sub-properties if no argument is
    specified.

    For more information, see https://github.com/cowboy/grunt

## Why use a build tool

* automate the boring repetitive parts
    * so you can spend more time creating things

* hard to dev with optimized code
    * but fast sites are important

## Grunt basics

Grunt is a really nice build tool based on node. It has some built-in tasks such as:

 * **concat** - Concatenate files.
 * **init** - Generate project scaffolding based on user input.
 * **lint** - Validate files with [JSHint][jshint].
 * **min** - Minify files with [UglifyJS][uglify].
 * **test** - Run unit tests with [nodeunit][nodeunit].
 * **watch** - Run predefined tasks whenever watched files change.

[jshint]: http://www.jshint.com/
[uglify]: https://github.com/mishoo/UglifyJS/

In addition to that, we can define our own. Actually, the h5bp build script does this while still relying on the built-in ones that grunt provides.

### Project configuration

Build scripts based on grunt are configured through a file usually named `grunt.js` in the current working directory.

This is used to setup the configuration for each defined tasks (built-in or custom). More information may be found in [grunt's readme](https://github.com/cowboy/grunt/blob/master/README.md), pretty cool stuff can be used in there, namely [directives](https://github.com/cowboy/grunt/blob/master/README.md#directives).

Here is a small snippet of grunt's readme related to project configuration.

> Each grunt task relies on configuration information defined in a single `config.init()` call in the gruntfile. Usually, this information is specified in task-named sub-properties of a main configuration object. It's not as complicated as it sounds.

> For example, this simple configuration would define a list of files to be linted when the task "lint:files" was run on the command line like this: `grunt lint:files`.


    config.init({
      lint: {
        files: ['lib/*.js', 'test/*.js', 'grunt.js']
      }
    });

### More Grunt basics

* [config](https://raw.github.com/cowboy/grunt/master/README.md#config)
* [tasks](https://raw.github.com/cowboy/grunt/master/README.md#tasks)
* [tasks alias](https://raw.github.com/cowboy/grunt/master/README.md#tasks_alias)
* [tasks basic](https://raw.github.com/cowboy/grunt/master/README.md#tasks_basic)
* [tasks custom](https://raw.github.com/cowboy/grunt/master/README.md#tasks_custom)
* [logging](https://raw.github.com/cowboy/grunt/master/README.md#logging)
* [exit codes](https://raw.github.com/cowboy/grunt/master/README.md#exit_codes)
* [examples](https://raw.github.com/cowboy/grunt/master/README.md#examples)

## H5BP Build configuration

For what it's worth, here's the basic current configuration for the build script, which is located in repo's root.

    // This is the main html5-boilerplate build configuration file.
    //
    //
    //   task.registerTask('default', 'lint:build intro clean mkdirs concat css min rev usemin manifest serve');
    //
    config.init({

      pkg: '<json:package.json>',

      intro: {
        pkg: '<config:pkg>'
      },

      clean: '<config:mkdirs>',

      mkdirs: {
        intermediate: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' '),
        publish: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' ')
      },

      concat: {
        'intermediate/js/libs.js': [ 'js/mylibs/*' ],
        'intermediate/js/scripts.js': [ 'js/plugins.js', 'js/script.js' ],
        'intermediate/css/style.css': [ 'css/*.css' ]
      },

      css: {
        'publish/css/style.css': [ 'css/style.css' ]
      },

      min: {
        'publish/js/libs.js': [ 'intermediate/js/libs.js' ],
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
        build: ['grunt.js', 'build/tasks/*.js']
      },

      watch: {
        files: '<config:lint.build>',
        tasks: 'lint:build',

        reload: {
          files: '<config:lint.build>',
          tasks: 'foo'
        }
      },

      serve: {
        intermediate: { port: 3000 },
        publish: { port: 3001 }
      },

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

    });

    // Run the following tasks...
    task.registerTask('default', 'lint:build intro clean mkdirs concat css min rev usemin manifest serve');
    task.registerTask('nolint', 'intro clean mkdirs concat css min rev usemin manifest');

    task.registerTask('connect-watch', 'connect watch:reload');

The default task will run the following tasks:

* **intro**: Kindly inform the developer about the impending magic.
* **clean**: Wipe the previous build dirs.
* **mkdirs**: Prepares the build dirs.
* **concat**: Concatenate files. *(built-in)*
* **css**: Concats, replaces @imports and minifies CSS files.
* **min**: Minify files using UglifyJS
* **rev**: Automate the revving of assets and perform the hash rename
* **usemin**: Replaces references to non-minified scripts / stylesheets

In addition to those tasks, which are the backbone of the build script, there are a few additionnal tasks to help you in the process:

* **serve**: Spawns up a basic local http server (on both pubilsh / intermediate folder with different ports).
* **connect**:  Spawns up local http sever with socket.io configured, it'll inject a tiny client side script + socket.io lib on `*.html` response. (to be renamed into *reload*).

### Tasks

You'll find below a basic description and documentation for each task that the build script use, built-in or custom one. For each of these, we'll detail the task configuration and how to tweak this.

#### intro

Nothing to worry about here, this task will just write to the console
some info on the build script about to be triggered.

#### clean

The clean task will remove and wipe out any previous build dirs (which
are ./intermediate and ./publish)

    clean: '<config:mkdirs>',

The `<config:mkdirs>` placeholder is a grunt directive. It's great to
dry-out the configuration. It'll simply replace this by the mkdirs
config values.

The clean will be triggered for each config subprop (intermediate/ and
publish/) and remove the dirs accordingly.

#### mkdirs

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

#### concat

Concat is a built-in grunt task and allows you to easily concatenate a
list of files.

      concat: {
        'intermediate/js/libs.js': [ 'js/mylibs/*' ],
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

#### css

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

#### min

Min is another built-in grunt task that allows you to easily compress
JavaScript files through [UglifyJS][uglify].

    min: {
      'publish/js/libs.js': [ 'intermediate/js/libs.js' ],
      'publish/js/scripts.js': [ 'intermediate/js/scripts.js' ]
    },

Really similar to the concat tasks, config subprop are used as
destination files, expanded files from config values are passed through
uglify.

#### rev

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

#### usemin

Usemin is probably the trickiest one. It'll replace reference to non
minified scripts / stylesheets to their optimized / versioned
equivalent.

    usemin: {
      files: ['publish/*.html']
    },

In this configuration, it'll handle the replacement for any html files
located under the publish directory.

#### serve

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

#### watch

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

#### connect (reload)

The connect (soon to be renamed into reload) is a special little utility
task working in tandem with the watch one.

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

##### Notes

Following are rough notes and may be layout in gh issues as well.

**questions, things to be clarified**

* Wraps grunt into an `h5bp` binary ?
* Two main ways to get things done
    * regular build script with grunt configs and `intro clean mkdirs concat css min rev usemin manifest` tasks. 
    * Using jsdom to avoid configuration as much as possible, and guess what to do from dom parsing.
    * How to layout these? Should be one the default, and recommended over the other one?

**todo**

* manifest task needs to be implemented
* css imports inline needs to be improved (by picking up necessary code from r.js css optimization for instance, I know that it works pretty well, with nested path support)
* Overall build script needs to be tested, and those tests need to be automated
* img optimization needs to be (re)implemented: jpeg/png opt via necessary tool (optipng/jpegtran) + rev img

**todo ++**

Following goes beyond what the current build script does, but can be worth investigating / implementing.

* Inline `<script\>` tags under a specific size
* Embed images as DataURIs into CSS
* Optionally create a MTHML file for IE6/7
    * (cssembed / jamit do this really well). The node code to to that is pretty simple, what it's not is the support for IE6/7 which require MHTML instead (cssembed / jammit can generate both).
    * maybe a good balance to serve optimized (in term of assets embedding) to all brothers, but serve the unoptimized version to IE6/7.
* do the revving (hash renames) for Images/SWFs/Fonts too.

* That's certainly not for everyone, but...
    * Prefixes relative urls with an absolute value for using a CDN

* Cleans up @VERSION@ in assets (or any global script replacement to do)
* Removes JS Logging
* ... and maybe something else I forgot?



