
The h5bp build script now has three versions, the main one being
the [ant-build-script][]. This
project is the node version, and it uses [Grunt][grunt] as a build tool.

It is packaged as a [grunt plugin][] and provides you a bunch of tasks and
helpers to help improve the performance of your site/app in a production
environment.

## Description

This node/grunt-based build script tries to be as close as possible to
the [ant-build-script][], a really great project you should check out.

It is still in early stage of development, but it'll get
better and better, based on [your feedbacks](https://github.com/h5bp/node-build-script/issues).

## Quick start

**Fancy one line install:**

```sh
# see the gist: https://gist.github.com/2359881
$ curl https://raw.github.com/gist/2359881/install.sh | sh
```

**Slightly less fancier**

```sh
$ npm install https://github.com/h5bp/node-build-script/tarball/master -g
$ h5bp help
$ h5bp init
```

## Features

* Concats / Compresses JS
* Concats / Compresses CSS
* Inline CSS imports via
* Basic to aggressive html minification (via [html-minfier][])
* Optimizes JPGs and PNGs (with jpegtran & optipng)
* Renames JS/CSS to prepend a hash of their contents for easier versioning
* Does the necessary regex replacements in html files and templates
* Experimental dom-based (with [JSDOM]()) build system.
* May rerun the build script on file changes (grunt's watch task &#10084;)
* May automatically reload the page in your browsers whenever watched files
  change, through some [socket.io] magic.

## Getting started

* [Install](https://github.com/h5bp/node-build-script/wiki/install) the package
* Check out the extensive [grunt documentation][], specifically the
  [Getting Started][] section.
* Learn more about [Usage](https://github.com/h5bp/node-build-script/wiki/overview)
  and [Configuration](https://github.com/h5bp/node-build-script/wiki/configuration)
* Look at the [available tasks](https://github.com/h5bp/node-build-script/wiki/tasks)
* Test out the experimental
  [dom-based](https://github.com/h5bp/node-build-script/wiki/dom) build
  system.

## Project information

* Source: http://github.com/h5bp/node-build-script
* Docs: http://github.com/h5bp/node-build-script/wiki
* Issues: http://github.com/h5bp/node-build-script/issues

## Run the tests

```sh
$ npm test
```

[grunt]: https://github.com/cowboy/grunt
[grunt documentation]: https://github.com/cowboy/grunt/blob/master/docs/toc.md
[Getting Started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md#readme)
[JSDOM]: https://github.com/tmpvar/jsdom
[ant-build-script]: https://github.com/h5bp/ant-build-script
[socket.io]: http://socket.io
[html-minifier]: https://github.com/kangax/html-minifier
