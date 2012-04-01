
The h5bp build script based on ant has been ported to use node as a build tool.

There was a first attempt using cake and coffeescript to do that. This
port has been itself ported to use grunt instead. Here we'll go through
grunt usage and the h5bp build script documentation based on it.

## Getting Started

This project provides two build-script implementation. 

The first using a set of grunt, each dealing with specific part of the
build process. The second is a dom-based implementation. It uses
[JSDOM](https://github.com/tmpvar/jsdom) to parse the content of input
files, and perform the necessary optimization based on html markup.

The first is relying entirely on configuration values (that appear in
the gruntfile), the second tries to minimize the need and the amount of
necessary configuration to rely on html markup instead.

* **grunt usage**
Be sure to check out the extensive grunt documantation, specifically the [Getting
Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md#readme)
section.

* **tasks and configuration** Learn more about the [[build
  script|overview]], the [[available tasks|tasks]] and [[configuration]].

* **[[dom-based|dom]]** [[using JSDOM|dom]]. Build scripts may drastically reduce the need of
  configuration, by using pure html markup and the dom to build and
  transform the resulting html.


## Diving in

