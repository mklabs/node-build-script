
2012-05-20
==========
**v0.2.0**

  * Update mocha generated docs
  * Tests for the rjs task
  * Tests for init task
  * Slight changes to the rjs task, moving config to gruntfile
  * Add init templates for default and rjs configuration

2012-05-19
==========

  * Move back the lib entry point to root, needs to be next the tasks/ dir
    otherwise, grunt won't find it with the npmTasks thing
  * Tests for html task and build:minify
  * Don't spawn a full server for viewing the docs
    - File protocol should be enough
    - Plus basic tests for the doc tasks, just testing the task goes through
  * use mocha directly with npm test, turn off helpers log when --silent
  * No grunt output by default during test
    when --silent flag is turned on, stderr/stdout output of spawned grunt
    is not redirect back to the current process.
  * Rework the usemin task to also do the replacement in stylesheets
    Closes [#27](https://github.com/h5bp/node-build-script/issues/27)
  * Add test setup for img replacement in stylesheets.
    Relates to [#27](https://github.com/h5bp/node-build-script/issues/27)
  * Add credits to @krzychukula for the replace helper
    love it, super easy to add new hooks. Now needs to run it through the
    optimized stylesheets
  * Add a new replacement for usemin on html files for url(...)
    case there are some inline <style />. Start of a fix for [#27](https://github.com/h5bp/node-build-script/issues/27)
  * update css fixture files
  * Add fixtures to test out the imports inline
  * css task - do the minification once inline imports are done
  * Reformat project's gruntfile, comments on dev helpers and tests
  * deps: update requirejs
  * Format build targets, move all the comments to the top
  * Move test mocha wrapper and helper to generate the test in support/
  * Move doc generation task in support/grunt-docs.js
  * Re-generate the docs
  * Add dev helpers un support/grunt-inspect.js, init a tasks/util.js file
  * Move lib entry point to lib/h5bp.js
  * Run each test sequentially, making sure to exit on first fail
  * Move script/ to support/
  * deps: update request

2012-05-17
==========

  * Add notes on local install for dev

2012-05-06
==========

  * Generate test documentation
    this doc reporter is pretty cool
  * Add tests for the usemin task
  * formatting build targets in helpfile for clarity.
  * Add tests for the tar task, plus few more assertion helpers
  * Generate test with `test-` prefix
  * Generate tests for tar task
    Results of running grunt genmocha:tar
  * grunt test, to run them all
  * Add tests for img task
  * Add tests for css task
  * Rework default task test and update helpers

  * add tasks to generate test for a given task
    * Should this make testing easier. Added task which prompt for a bunch of
    values, which are used with the gherkin feature template file in
    test/features/template.feature.
    * A default step definition file is used (if there's no task specific
    step defs) with snippets to run a given task, and some basic assertions.
    * The test generated should provide a good starting point but will most
    likely need to adjust a few path maybe (unless you give the correct
    prompt, or adjust the feature file and regenerate)
    * Usually, each task is comparing a file or a set of files in `.test`
    directory with expected files stored in test/fixtures/<taskname>
    * Tests needs to define a mocha before handler with helper.before
    function.

  * cleanup, remove old test suite
  * grunt test running mocha instead
  * Add mocha test setup

2012-05-01
==========

  * Merge pull request [#36](https://github.com/h5bp/node-build-script/issues/36) from EpocSquadron/feature/requirejs-task
    * Task to use Requirejs for js optimization

2012-04-28
==========

**v0.1.1**

  * bump version 0.1.1
    * closes [#34](https://github.com/h5bp/node-build-script/issues/34)

2012-04-24
==========

  * complete mkdirs/copy refactoring. Bonus: we now have a tar task!
    for easy tarball creation.
    * The tar task is standalone, not part of overall build
    * The copy task has some logic to know whether it needs to be a simple
    directory copy or tar/tgz creation.
    * If the file ends with either .tar or .tgz, a tarball is made from then
    the intermediate/ folder (or any other value put in config for
    `staging`)
    * If it ends with .tgz, then the tarball is also gziped (pass tru
    zlib.Gzip())
    * Changing last step to not create a publish directory, but rather
    creates a single tarball for the build output is a matter of appending
    `.tgz` at the end of config for `output`
    * Copy itself is far clever. It now uses fstream-ignore to intelligently
    avoid the copy of files matching globs in one of .gitignore, .ignore
    and .buildignore files. This eventually fixes a nasty bug on Windows
    for the mkdirs task.
    Closes [#30](https://github.com/h5bp/node-build-script/issues/30)

2012-04-23
==========

  * minor changes to misc.js and copy/mkdirs tasks
    still needs a bit more work (further tests on tar generation, bad EOF,
    should set strip: 1)
    relates to [#30](https://github.com/h5bp/node-build-script/issues/30)
  * minor change to task doc, open browser and forget
    * windows kinda weird with "explorer" command, returns status !=0 even
    though evertyhing went well.
    * will probably ends up in just the display of url to open, no automatic
    browser opening
  * improved copy / mkdirs task to use fstream and ignore
    * alot clever now
    * automatically ignores globs in .gitignore, .ignore, .buildignore
    throughout the tree
    * can copy a whole dir to another one (basic)
    * can also copy into a tarball destination (gzipped, should be optional)
    if the destination ends with .tar
    still a bit more work to do and cleanup (namely the tar copy) to close
    issue [#30](https://github.com/h5bp/node-build-script/issues/30)

2012-04-22
==========

  * Add prompts for choosing requirejs, and conditional stuff in gruntfile template
  * Add a task file that optimizes only js usign requirejs


2012-04-16
==========

**0.1.0**

    * update grunt to 0.3.7, udpate binary

    * add a docs tasks
      * plus the internal scripts/docs tool and genedocs grunt task to generate
      * the docs task will start a server on top of docs/ directory and open a
        browser on generated documentation

    * css - use rjs to optimize and handle @import statements

    * Added few alias as build targets. Closes #21

    * add img optimization task, optipng / jpetran (closes #25)
      * fallback to local binaries for windows system
        * added optipng-8d and optipng-0.7.1 into vendor/
        * necessary change to img task code to work on windows

    * slightly reworked the build targets to be a single task (closes #26)
      * to run: `grunt build:<target>`
      * targets: default, text, buildkit, basics, minify

    * pre/post series of tasks runs automatically
      * pre: intro clean mkdirs
      * post: copy time

    * add some debugging helpers to project gruntfile

    * add htmlclean task, build targets and removed tasks' subdirs
      * htmlclean task, running html through html-minifier. Closes #23

    * plugin config/tasks loading now done in tasks/h5bp.js

    * moved all tasks files into tasks/*.js (no more subdir, except the init one)

    * minor tweaks to our custom binary

    * init task (closes #29)

    * better mkdirs task, reading .gitignore file to avoid file copy
        * complements the exclude property of config
        * this doensn't work recursively, eg. .gitignore files in subdfolders are
        not handled.

    * removed docs, now in wiki and separate branch

    * improved the tests

    * usemin - have the switch to revved file done with surrounding comments (closes #13)

    * usemin - reworked the usemin task to be a little bit clever
      * original idea from @necolas in: https://github.com/h5bp/html5-boilerplate/issues/831
      * usemin task is now using "directives", some special kind of html comments
      surrounding the part of html we want to replace.
Ex:

    <!-- build:css css/site.css -->
    <link rel="stylesheet" href="css/style.css">
    <!-- endbuild -->

Results in: `<link rel="stylesheet" href="css/site.css">`

    * mkdirs - rewrote the mkdirs task to use ncp and minimatch
      * ignores are glob paterns
      * output / staging dirs filtered too, automatically added to the list
      of ignores
      * cleanup

    * rev - reworked the rev task, updated gruntfile
      * register a simple task
      * with two helpers: hash / md5

    * connect - same rework as the serve task
      * register helper connect and basic task

    * serve - reworked the serve task, using new grunt api

    * gruntfile 0.3.x updates

    * dom - minor changes to plugins options (cwd, dir, out) and file html output
      * added cwd for base dir to work from
      * out: assets optimized output gets resolve under this dir
      * html file output at the same location (will most likely work with a
        pre-copy task)

    * Init the udpate to grunt 0.3.x api, minor changes + script domplugin first impl
      * moving tasks into tasks "subsets"
      * update of load method, a bit hacky right now
      * minor docs updates
      * moving jquery from support to tasks/dom/support
      * minor changes to link domplugin
      * added script plugin, with basic concat / min / replace
      * plus some minor changes to runner (previously tasks/dom)

    * dom - a start on dom-based build using jsdom
      * doing most of the stuff outlined in
        https://github.com/h5bp/node-build-script/wiki/jsdom-implementation
      * the only plugin (partially) implemented is link for now (#1)

2012-03-14
==========

**v0.0.3**

  * misc - update connect / socket.io to latest (closes #14)
  * dist - update grunt to latest (0.2.15)
  * misc - ensure parent directory is there before copying
    * merged changes to misc task (closes #11)

2012-03-06
==========

**v0.0.2**

  * add an h5bp executable, wrapper to built-in grunt
  * better and improved usemin task (by @krzychukula / #9)
  * usemin - use the same technique of file replacement for css/img than js'
    * file expand of every file within output postfixed by assets reference
    * relative path handling
    * replacement of css / js if found, otherwise skip it probably
      concatenated into another file
    * replacement of img if found, otherwise leave off the actual content
    * absolute and external uris ignored
  * usemin - handle relative prefix with nested .html files

  * start of test suite (vows based)
  * output / staging config values (#3)
  * improved documentation
  * windows support
  * added a basic server reload ability, using socket.io / grunt's watch (live reload like)
    * the whole idea is refering to https://github.com/tbranyen/backbone-boilerplate/issues/10
    * A tiny client-side script is injected on every `*.html` requests, the
    connect task (might be renamed) setup a basic connect server with
    socket.io enabled. Whenever a new connection is established, the socket
    object is stored through `config('socket')` to be able to use it and
    emit from another task (a task that it triggered by grunt's watch)
    * kudos to @tbranyen for the original idea

2012-01-15
==========

**v0.0.1**

  * birthday!
  * added tasks and gruntfile for basic css / js / imgs opts
    * First working implementation that includes:
      * concat / minfiy js files
      * inline @imports of css files (recursive process, should support any
       level of nested imports) + minification
      * revving of js / css / imgs
      * html inline replace of js / css / imgs (to the revved one)
