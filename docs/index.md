
The h5bp build script based on ant has been ported to use node as a build tool.

There was a first attempt using cake and coffeescript to do that. This
port has been itself ported to use grunt instead. Here we'll go through
grunt usage and the h5bp build script documentation based on it.

## Features

* Combines and minifies JavaScript (via uglify)
* Combines and minifies CSS
* Inlines stylesheets specified using @import in your CSS
* Revises the file names of your assets so that you can use heavy caching (1 year expires).
* Upgrades the .htaccess to use heavier caching
* Updates your HTML to reference these new hyper-optimized CSS + JS files
* Runs your JavaScript through a code quality tool (optional)
* Retriggers the build script on file changes (optional)
* Automatically reload the page in your browsers whenever watched files
  change, through some socket.io magic (optional)

## Getting Started

This project provides two build-script implementation.

The first using a set of grunt task, each dealing with specific part of the
build process.

The second is a dom-based implementation. It uses
[JSDOM](https://github.com/tmpvar/jsdom) to parse the content of input files,
and perform the necessary optimization based on html markup.

The first is relying entirely on configuration values (that appear in
the gruntfile), the second tries to minimize the need and the amount of
necessary configuration to rely on html markup instead.

* **grunt usage**
Be sure to check out the [extensive grunt
documentation](https://github.com/cowboy/grunt/blob/master/docs/toc.md),
specifically the [Getting
Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md#readme)
section.

* **tasks and configuration**
Learn more about the [[build script|overview]],
the [[available tasks|tasks]] and [[configuration]].

* **[[dom-based|dom]]** [[using JSDOM|dom]].
Build scripts may drastically reduce the need of
configuration, by using pure html markup and the dom to build and
transform the resulting html.

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

For development, the `npm link` command might be handy (posix only, insted of
`npm install -g`).

### npm install tar.gz

node-build-script is not on npm (yet), but you can install it (and/or add it to
your project dependencies) using tarball url, very much like if it was published
on npm.

Append a `-g` flag if you'd like to install globally and have the h5bp binary
installed.

    npm install https://github.com/h5bp/node-build-script/tarball/master

Proxies don't like redirections, if you get problem with this command, try
this instead:

    npm install http://nodeload.github.com/h5bp/node-build-script/tarball/master

## Uninstall

You may want to uninstall the globally installed package by running the
following command:

    npm uninstall node-build-script -g

So sad to see you go ☹
