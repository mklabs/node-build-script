# Overview

node-build-script is a tool that optimizes your code for production use on the
web, relying on [grunt](https://github.com/cowboy/grunt) build tool.

It is packaged as a grunt plugin, it defines an `h5bp` binary which wraps grunt
plus few additional tasks and helpers.

One can decide to pull in a set of tasks and helper in their grunt setup,
instead of relying on the global `h5bp` binary.

## Install

There is two main way to get started, using a "global" or a "local" install.

1. **When installed globally**: Provides a custom global binary named `h5bp`
(or `html5-boilerplate`) which is a wrapper on top of grunt, plus the extra
specific task and helpers.

2. **When installed locally**: ability to load in your project and grunt setup a
set of tasks that get referenes in your gruntfile (`grunt.js`) when run via `grunt`.

### global install

    npm install http://nodeload.github.com/h5bp/node-build-script/tarball/master -g

This installs the plugin globally, which contains its own internal grunt and
provides an `h5bp` binary.

### local install

This works for system where grunt have been already installed globally with `npm
install grunt -g`.

1. Add the node-build-script as a project dependency. In your projet's root,
next to the `grunt.js` and `package.json` file, run `npm install
http://nodeload.github.com/h5bp/node-build-script/tarball/master -S`

2. Add `grunt.loadNpmTasks('node-build-script')` into the projetc's `grunt.js` gruntfile.

3. Run `grunt --help` and all of the node-build-script's tasks and helpers
should be available in addition to those already provided by grunt.

The `-S` flag (or `--save`) will make npm add the dependency in the
`dependencies` property of your package.json. This is optional but ensures you
never forget to update your package.json file accordingly.

**Note**: Once on npm, it'll be easier. The `npm install -S` step will add the
following to your package.json file.

```js
"dependencies": {
  "node-build-script": "0.1.0"
}
```

Change `0.1.0` to the tarball url: http://nodeload.github.com/h5bp/node-build-script/tarball/master

## Usage

Running `h5bp --help` should output the following to the console

    grunt: a task-based command line build tool for JavaScript projects. (v0.3.7)

    Usage
     h5bp [options] [task [task ...]]

    Options
        --help, -h  Display this help text.
            --base  Specify an alternate base path. By default, all file paths are
                    relative to the "grunt.js" gruntfile. (grunt.file.setBase) *
        --no-color  Disable colored output.
          --config  Specify an alternate "grunt.js" gruntfile.
       --debug, -d  Enable debugging mode for tasks that support it. For detailed
                    error stack traces, specify --debug 9.
       --force, -f  A way to force your way past warnings. Want a suggestion? Don't
                    use this option, fix your code.
           --tasks  Additional directory paths to scan for task and "extra" files.
                    (grunt.loadTasks) *
             --npm  Npm-installed grunt plugins to scan for task and "extra" files.
                    (grunt.loadNpmTasks) *
        --no-write  Disable writing files (dry run).
     --verbose, -v  Verbose mode. A lot more information output.
         --version  Print the grunt version.

    Options marked with * have methods exposed via the grunt API and should instead
    be specified inside the "grunt.js" gruntfile wherever possible.

    Available tasks
            concat  Concatenate files. *
              init  Generate project scaffolding from a predefined template.
              lint  Validate files with JSHint. *
               min  Minify files with UglifyJS. *
             qunit  Run QUnit unit tests in a headless PhantomJS instance. *
            server  Start a static web server.
              test  Run unit tests with nodeunit. *
             watch  Run predefined tasks whenever watched files change.
           default  Alias for "intro clean mkdirs concat css min rev usemin
                    manifest" tasks.
            reload  Alias for "default connect watch:reload" tasks.
               css  Concats, replaces @imports and minifies the CSS files *
             intro  Kindly inform the developer about the impending magic
            mkdirs  Prepares the build dirs *
             clean  Wipe the previous build dirs
          manifest  Generates manifest files automatically from static assets
                    reference. *
               rev  Automate the hash renames of assets filename *
             serve  Spawns up a local http server on both staging / output
                    directory
            usemin  Replaces references to non-minified scripts / stylesheets *

    Tasks run in the order specified. Arguments may be passed to tasks that accept
    them by using semicolons, like "lint:files". Tasks marked with * are "multi
    tasks" and will iterate over all sub-targets if no argument is specified.

    The list of available tasks may change based on tasks directories or grunt
    plugins specified in the "grunt.js" gruntfile or via command-line options.

    For more information, see https://github.com/cowboy/grunt

## Loading tasks and helpers in your grunt setup

You may opt to go to the local install, and manually load the tasks and helpers
node-build-script provides.

Assuming you have no gruntfile yet for your project, run the followin grunt init command:

    grunt init:gruntfile

Grunt will ask you for few different things, simply follow the instructions.
This will create a new `grunt.js` file relative to your current working
directory.

The generated gruntfile should look like this:

```js
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

};
```

To load the node-build-script and helpers, you'll need to use the
`grunt.loadNpmTasks('node-build-script')` statement, next to the
`grunt.registerTask('default', 'lint qunit concat min');`.

Then, from your projet's root, running `grunt --help` should output the
following:

    ...

    Available tasks
            concat  Concatenate files. *
              init  Generate project scaffolding from a predefined template.
              lint  Validate files with JSHint. *
               min  Minify files with UglifyJS. *
             qunit  Run QUnit unit tests in a headless PhantomJS instance. *
            server  Start a static web server.
              test  Run unit tests with nodeunit. *
             watch  Run predefined tasks whenever watched files change.
           default  Alias for "lint qunit concat min" tasks.
              emit  A basic task that emits events over socket.io
           connect  Spawns up a local http server with socket.io enabled
               css  Concats, replaces @imports and minifies the CSS files *
             intro  Kindly inform the developer about the impending magic
            mkdirs  Prepares the build dirs *
             clean  Wipe the previous build dirs
          manifest  Generates manifest files automatically from static assets
                    reference. *
               rev  Automate the hash renames of assets filename *
             serve  Spawns up a local http server on both staging / output
                    directory
            usemin  Replaces references to non-minified scripts / stylesheets *

    ...
