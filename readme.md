
The h5bp build script based on ant has been ported to use node as a build tool.

There was a first attempt using cake and coffeescript to do that. This
port has been itself ported to use grunt instead. Here we'll go through
grunt usage and the h5bp build script documentation based on it.

## Features

Does the following things (not necessarily in the same order):

* Concats / Compresses JS
* Concats / Compresses CSS
* Inlice CSS imports
* Renames JS/CSS to prepend a hash of their contents for easier versioning
* Does the necessary regex replacements in html files and templates
* Retriggers the build script on file changes (watch mode &#10084;)
* Automatically reload the page in your browsers whenever watched files
  change, through some socket.io magic.

## Requirements

In order to successfully use this you will need:

* node <= 0.6.7
* npm

You should be able to use it on:

* OSX
* Unix
* Windows

## Install instructions

Install can be done in a few different ways, pick the one that suits you
best.

### git clone / npm install

Clone or download this repo. Then, `cd` into it and run the `npm
install` command.

    # will most likely change to map the new location / repo / branch
    git clone git://github.com/h5bp/node-build-script.git

    # install the dependencies
    # locally to play with it from the repo
    npm install

    # or globally, to install the h5bp binary
    npm install -g

### npm install tar.gz

Note that all of these can be shorten to one single command, very much
like if it was published on npm. Append a `-g` flag if you'd like to
install globally and have the h5bp binary installed.

    npm install https://github.com/h5bp/node-build-script/tarball/master

Proxies don't like redirections, if you get problem with this command, try
this instead:

    npm install http://nodeload.github.com/h5bp/node-build-script/tarball/master

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

So sad to see you go ☹

## Usage

Once installed and everything setup, you'll be able to run the following
command, and get the according help ouptut:

    h5bp --help

To start a new build, cd into html5-boilerplate repo and run:

    h5bp

    # which is similar to `h5bp default`

It'll create two build folders:

* `intermediate/`: used as a "staging area", will include original files
  and concat'd ones.
* `publish/`: build results, will include the whole optimized website,
  with revved assets, concat'd / minified scripts and stylesheets, and
  html files and templates with references replaced.

This two directories may be setup using `grunt.js` staging and
production config values.

If you'd like to trigger the build script in watch mode, you may want to
run this command instead:

    h5bp watch

The default configuration will watch for changes for `js/*.js` and
`css/**` files and rerun the default task whenever these watched files
change.

The reload task is a slight variation of the watch task. It'll spawns up
a local http server, watch for file changes, rerun the default task and
emit back to any connected clients an event that will trigger a full
page reload.

    h5bp reload

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
[nodeunit]: https://github.com/caolan/nodeunit

In addition to that, we can define our own. Actually, the h5bp build
script does this while still relying on the built-in ones that grunt
provides.

### Project configuration

Build scripts based on grunt are configured through a file usually named
`grunt.js` in the current working directory.

This is used to setup the configuration for each defined tasks (built-in
or custom). More information may be found in [grunt's
readme](https://github.com/cowboy/grunt#readme).

Here is a small snippet of grunt's readme related to project configuration.

> Each grunt task relies on configuration information defined in a
> single `config.init()` call in the gruntfile. Usually, this
> information is specified in task-named sub-properties of a main
> configuration object. It's not as complicated as it sounds.

> For example, this simple configuration would define a list of files to
> be linted when the task "lint:files" was run on the command line like
> this: `grunt lint:files`.


    config.init({
      lint: {
        files: ['lib/*.js', 'test/*.js', 'grunt.js']
      }
    });

Be sure to check out [grunt's
documentation](https://github.com/cowboy/grunt/blob/master/docs/toc.md#readme) for more
informations.

### Tasks

The default task will run the following tasks:

* **intro**: Kindly inform the developer about the impending magic.
* **clean**: Wipe the previous build dirs.
* **mkdirs**: Prepares the build dirs.
* **concat**: Concatenate files. *(built-in)*
* **css**: Concats, replaces @imports and minifies CSS files.
* **min**: Minify files using UglifyJS
* **rev**: Automate the revving of assets and perform the hash rename
* **usemin**: Replaces references to non-minified scripts / stylesheets

In addition to those tasks, which are the backbone of the build script,
there are a few additionnal tasks to help you in the process:

* **serve**: Spawns up a basic local http server (on both pubilsh /
  intermediate folder with different ports).
* **connect**:  Spawns up local http sever with socket.io configured,
  it'll inject a tiny client side script + socket.io lib on `*.html`
  response.
* **reload**: Alias for `connect watch:reload`.

You may find a slightly more detailed documentation for each tasks in
the [`tasks/`
directory](https://github.com/h5bp/node-build-script/tree/master/tasks#readme).

