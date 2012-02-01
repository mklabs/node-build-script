H5BP Build Script: A node-based website optimization system
===========================================================

The h5bp build script based on ant has been ported to use node as a build tool.

There was a first attempt using cake and coffeescript to do that. This port has been itself ported to use grunt instead. Here we'll go through grunt usage and the h5bp build script documentation based on it.

## Features

Does the following things (not necessarily in the same order):

* Concats / Compresses JS
* Concats / Compresses CSS
* Inlice CSS imports
* Renames JS/CSS to append a hash of their contents for easier versioning
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

> todo

#### clean

> todo

#### mkdirs

> todo

#### concat

> todo

#### css

> todo

#### min

> todo

#### rev

> todo

#### usemin

> todo

#### serve

> todo

#### connect (reload)

> todo

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













