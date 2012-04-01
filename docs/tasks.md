# Tasks

You'll find below a basic description and documentation for each task
the grunt h5bp plugin provides. For each of these, we'll detail the
task's configuration and how to change this.

* **[[clean]]**: Wipe the previous build dirs.
* **[[mkdirs]]**: Prepares the build dirs.
* **[[concat]]**: Concatenate files. *(built-in)*
* **[[css]]**: Concats, replaces @imports and minifies CSS files.
* **[[min]]**: Minify files using UglifyJS
* **[[rev]]**: Automate the revving of assets and perform the hash rename
* **[[usemin]]**: Replaces references to non-minified scripts / stylesheets

In addition to those tasks, which are the backbone of the build script,
there are a few additionnal tasks to help you in the process:

* **[[serve]]**: Spawns up a basic local http server (on both pubilsh /
  intermediate folder with different ports).
* **[[connect]]**:  Spawns up local http sever with socket.io configured,
  it'll inject a tiny client side script + socket.io lib on `*.html`
  response.
* **reload**: Alias for `connect watch:reload`.

