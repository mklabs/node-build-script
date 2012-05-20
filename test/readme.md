## Tests

---

**done**:

- ✔ default
- ✔ build:minify

- ✔ css.js
- ✔ img.js
- ✔ tar.js
- ✔ usemin.js
- ✔ docs.js
- ✔ html.js
- ✔ init.js
- ✔ rjs.js

**to be done**
- dom.js
- h5bp.js
- misc.js
- rev.js
- serve.js

# TOC
   - [Default task](#default-task)
     - [As a build script user I want to be able to run the default task So that I can see the whole tasks in action](#default-task-as-a-build-script-user-i-want-to-be-able-to-run-the-default-task-so-that-i-can-see-the-whole-tasks-in-action)
       - [Default task](#default-task-as-a-build-script-user-i-want-to-be-able-to-run-the-default-task-so-that-i-can-see-the-whole-tasks-in-action-default-task)
         - [When the build script ends](#default-task-as-a-build-script-user-i-want-to-be-able-to-run-the-default-task-so-that-i-can-see-the-whole-tasks-in-action-default-task-when-the-build-script-ends)
   - [build:minify task](#buildminify-task)
     - [As a build script user I want to run the build:minify task](#buildminify-task-as-a-build-script-user-i-want-to-run-the-buildminify-task)
       - [build:minify task](#buildminify-task-as-a-build-script-user-i-want-to-run-the-buildminify-task-buildminify-task)
         - [When the build script ends](#buildminify-task-as-a-build-script-user-i-want-to-run-the-buildminify-task-buildminify-task-when-the-build-script-ends)
   - [CSS task](#css-task)
     - [As a  build script user I want to be able to run the css task So that I can see the css task in action](#css-task-as-a-build-script-user-i-want-to-be-able-to-run-the-css-task-so-that-i-can-see-the-css-task-in-action)
       - [css task](#css-task-as-a-build-script-user-i-want-to-be-able-to-run-the-css-task-so-that-i-can-see-the-css-task-in-action-css-task)
   - [DOCS task](#docs-task)
     - [As a build script user I want to be able to run the docs task So that I can see the docs task in action](#docs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-docs-task-so-that-i-can-see-the-docs-task-in-action)
       - [docs task](#docs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-docs-task-so-that-i-can-see-the-docs-task-in-action-docs-task)
         - [Then it should not fail miserably](#docs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-docs-task-so-that-i-can-see-the-docs-task-in-action-docs-task-then-it-should-not-fail-miserably)
   - [HTML task](#html-task)
     - [As a build script user I want to be able to run the html task So that I can see the html task in action](#html-task-as-a-build-script-user-i-want-to-be-able-to-run-the-html-task-so-that-i-can-see-the-html-task-in-action)
       - [html task](#html-task-as-a-build-script-user-i-want-to-be-able-to-run-the-html-task-so-that-i-can-see-the-html-task-in-action-html-task)
   - [IMG task](#img-task)
     - [As a  build script user I want to be able to run the img task So that I can see the img task in action](#img-task-as-a-build-script-user-i-want-to-be-able-to-run-the-img-task-so-that-i-can-see-the-img-task-in-action)
       - [img task](#img-task-as-a-build-script-user-i-want-to-be-able-to-run-the-img-task-so-that-i-can-see-the-img-task-in-action-img-task)
   - [INIT task](#init-task)
     - [As a build script user I want to be able to run the init task So that I can see this in action](#init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action)
       - [init task default template](#init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action-init-task-default-template)
       - [init task rjs template](#init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action-init-task-rjs-template)
         - [When the script ends](#init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action-init-task-rjs-template-when-the-script-ends)
   - [RJS task](#rjs-task)
     - [As a build script user I want to be able to run the rjs task So that I can see the rjs task in action](#rjs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-rjs-task-so-that-i-can-see-the-rjs-task-in-action)
       - [rjs task](#rjs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-rjs-task-so-that-i-can-see-the-rjs-task-in-action-rjs-task)
   - [TAR task](#tar-task)
     - [As a build script user I want to be able to run the tar task So that I can see the tar task in action](#tar-task-as-a-build-script-user-i-want-to-be-able-to-run-the-tar-task-so-that-i-can-see-the-tar-task-in-action)
       - [tar task](#tar-task-as-a-build-script-user-i-want-to-be-able-to-run-the-tar-task-so-that-i-can-see-the-tar-task-in-action-tar-task)
   - [USEMIN task](#usemin-task)
     - [As a build script user I want to be able to run the usemin task So that I can see the usemin task in action](#usemin-task-as-a-build-script-user-i-want-to-be-able-to-run-the-usemin-task-so-that-i-can-see-the-usemin-task-in-action)
       - [usemin task](#usemin-task-as-a-build-script-user-i-want-to-be-able-to-run-the-usemin-task-so-that-i-can-see-the-usemin-task-in-action-usemin-task)
       - [usemin task with reved imgs](#usemin-task-as-a-build-script-user-i-want-to-be-able-to-run-the-usemin-task-so-that-i-can-see-the-usemin-task-in-action-usemin-task-with-reved-imgs)
<a name="" />
 
<a name="default-task" />
# Default task
<a name="default-task-as-a-build-script-user-i-want-to-be-able-to-run-the-default-task-so-that-i-can-see-the-whole-tasks-in-action" />
## As a build script user I want to be able to run the default task So that I can see the whole tasks in action
<a name="default-task-as-a-build-script-user-i-want-to-be-able-to-run-the-default-task-so-that-i-can-see-the-whole-tasks-in-action-default-task" />
### Default task
Given I run the 'default' task.

```js
helpers.run('default', done);
```

<a name="default-task-as-a-build-script-user-i-want-to-be-able-to-run-the-default-task-so-that-i-can-see-the-whole-tasks-in-action-default-task-when-the-build-script-ends" />
#### When the build script ends
Then the outcome should be 'test/fixtures/default'.

```js
helpers.assertFile('.test/publish/index.html', 'test/fixtures/default/expected.html');
```

<a name="buildminify-task" />
# build:minify task
<a name="buildminify-task-as-a-build-script-user-i-want-to-run-the-buildminify-task" />
## As a build script user I want to run the build:minify task
<a name="buildminify-task-as-a-build-script-user-i-want-to-run-the-buildminify-task-buildminify-task" />
### build:minify task
Given I run the 'build:minify' task.

```js
helpers.run('build:minify', done);
```

<a name="buildminify-task-as-a-build-script-user-i-want-to-run-the-buildminify-task-buildminify-task-when-the-build-script-ends" />
#### When the build script ends
Then the outcome should be 'test/fixtures/default/build.minify.html'.

```js
helpers.copyFile('.test/publish/index.html', 'test/fixtures/default/build.minify.html');
```

<a name="css-task" />
# CSS task
<a name="css-task-as-a-build-script-user-i-want-to-be-able-to-run-the-css-task-so-that-i-can-see-the-css-task-in-action" />
## As a  build script user I want to be able to run the css task So that I can see the css task in action
<a name="css-task-as-a-build-script-user-i-want-to-be-able-to-run-the-css-task-so-that-i-can-see-the-css-task-in-action-css-task" />
### css task
Given I run the 'css' task.

```js
// runt the css task
helpers.run('css', done);
```

When the script ends.

```js
// not doing particularly usefull in this step
// but the hook is here is we need to
done();
```

Then './test/css/style.css' should be the same as 'test/fixtures/css/expected.css'.

```js
helpers.assertFile('.test/css/style.css', 'test/fixtures/css/expected.css');
done();
```

<a name="docs-task" />
# DOCS task
<a name="docs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-docs-task-so-that-i-can-see-the-docs-task-in-action" />
## As a build script user I want to be able to run the docs task So that I can see the docs task in action
<a name="docs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-docs-task-so-that-i-can-see-the-docs-task-in-action-docs-task" />
### docs task
Given I run the 'docs' task.

```js
// runt the docs task
helpers.run('docs', done);
```

When the script ends.

```js
// not doing anything particularly usefull in this step but the hook is here
// if we need to
done();
```

<a name="docs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-docs-task-so-that-i-can-see-the-docs-task-in-action-docs-task-then-it-should-not-fail-miserably" />
#### Then it should not fail miserably
(and you should see the documention in a web browser by now..).

```js
assert.ok(true);
```

<a name="html-task" />
# HTML task
<a name="html-task-as-a-build-script-user-i-want-to-be-able-to-run-the-html-task-so-that-i-can-see-the-html-task-in-action" />
## As a build script user I want to be able to run the html task So that I can see the html task in action
<a name="html-task-as-a-build-script-user-i-want-to-be-able-to-run-the-html-task-so-that-i-can-see-the-html-task-in-action-html-task" />
### html task
Given I run the 'html' task.

```js
// runt the html task
helpers.run('html', done);
```

When the script ends.

```js
// not doing anything particularly usefull in this step but the hook is here
// if we need to
done();
```

Then './test/index.html' should be the same as 'test/fixtures/html/index.html'.

```js
helpers.assertFile('.test/index.html', 'test/fixtures/html/index.html');
done();
```

<a name="img-task" />
# IMG task
<a name="img-task-as-a-build-script-user-i-want-to-be-able-to-run-the-img-task-so-that-i-can-see-the-img-task-in-action" />
## As a  build script user I want to be able to run the img task So that I can see the img task in action
<a name="img-task-as-a-build-script-user-i-want-to-be-able-to-run-the-img-task-so-that-i-can-see-the-img-task-in-action-img-task" />
### img task
Given I run the 'img' task.

```js
// run the img task
//
// note: try commenting out this and execute done callback right away
// to see mocha generate diff output on base64 encoded value in its
// full glory
helpers.run('img', done);
```

When the script ends.

```js
// not doing particularly usefull in this step
// but the hook is here is we need to
done();
```

Then '.test/img' dir should be the same as 'test/fixtures/img/expected/'.

```js
helpers.assertDir('.test/img', 'test/fixtures/img/expected/');
done();
```

<a name="init-task" />
# INIT task
<a name="init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action" />
## As a build script user I want to be able to run the init task So that I can see this in action
<a name="init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action-init-task-default-template" />
### init task default template
Given I run the 'init' task with default template.

```js
// runt the init task
var grunt = helpers.run('init --template defaults', {
  bin: path.join(__dirname, '../../bin/h5bp')
}, done);
```

When the script ends.

```js
// not doing anything particularly usefull in this step but the hook is here
// if we need to
done();
```

Then '.test/' should be the same as 'test/fixtures/init/expected/'.

```js
helpers.assertDir('.test/', 'test/fixtures/init/expected/');
done();
```

<a name="init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action-init-task-rjs-template" />
### init task rjs template
Given I run the 'init' task with rjs template.

```js
// runt the init task
var grunt = helpers.run('init --template rjs --force', {
  bin: path.join(__dirname, '../../bin/h5bp')
}, done);
```

<a name="init-task-as-a-build-script-user-i-want-to-be-able-to-run-the-init-task-so-that-i-can-see-this-in-action-init-task-rjs-template-when-the-script-ends" />
#### When the script ends
Then '.test/gruntfile.js' should be the same as 'test/fixtures/init/rjs.gruntfile.js'.

```js
helpers.assertFile('.test/grunt.js', 'test/fixtures/init/rjs.gruntfile.js');
done();
```

<a name="rjs-task" />
# RJS task
<a name="rjs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-rjs-task-so-that-i-can-see-the-rjs-task-in-action" />
## As a build script user I want to be able to run the rjs task So that I can see the rjs task in action
<a name="rjs-task-as-a-build-script-user-i-want-to-be-able-to-run-the-rjs-task-so-that-i-can-see-the-rjs-task-in-action-rjs-task" />
### rjs task
Given I run the 'rjs' task.

```js
// runt the rjs task
helpers.run('rjs', done);
```

When the script ends.

```js
// not doing anything particularly usefull in this step but the hook is here
// if we need to
done();
```

Then '.test/js' should be the same as 'test/fixtures/rjs/expected/'.

```js
helpers.assertDir('.test/js', 'test/fixtures/rjs/expected/');
done();
```

<a name="tar-task" />
# TAR task
<a name="tar-task-as-a-build-script-user-i-want-to-be-able-to-run-the-tar-task-so-that-i-can-see-the-tar-task-in-action" />
## As a build script user I want to be able to run the tar task So that I can see the tar task in action
<a name="tar-task-as-a-build-script-user-i-want-to-be-able-to-run-the-tar-task-so-that-i-can-see-the-tar-task-in-action-tar-task" />
### tar task
Given I run the 'tar' task.

```js
// runs the tar task
// we gonna pack the whole '.test' dir in '.test/test.tar.gz'
// curious to see how the task handle output within input..
helpers.run('tar --input ./ --output ./test.tgz', done);
```

When the script ends.

```js
// not doing particularly usefull in this step
// but the hook is here is we need to
done();
```

Then '.test/test.tgz' should be the same as 'test/fixtures/tar/test.tgz'.

```js
helpers.assertLength('.test/test.tgz', 'test/fixtures/tar/test.tgz', done);
```

<a name="usemin-task" />
# USEMIN task
<a name="usemin-task-as-a-build-script-user-i-want-to-be-able-to-run-the-usemin-task-so-that-i-can-see-the-usemin-task-in-action" />
## As a build script user I want to be able to run the usemin task So that I can see the usemin task in action
<a name="usemin-task-as-a-build-script-user-i-want-to-be-able-to-run-the-usemin-task-so-that-i-can-see-the-usemin-task-in-action-usemin-task" />
### usemin task
Given I run the 'usemin' task.

```js
// runt the usemin task
helpers.run("usemin", done);
```

When the script ends.

```js
// not doing anything particularly usefull in this step
// but the hook is here if we need to
done();
```

Then '.test/usemin.html' should be the same as 'test/fixtures/usemin/index.html'.

```js
// todo: task log output doesn"t return things that were changed between
// <!-- build:<target> path/to/foo.js --> directives
helpers.assertFile(".test/usemin.html", "test/fixtures/usemin/index.html");
done();
```

<a name="usemin-task-as-a-build-script-user-i-want-to-be-able-to-run-the-usemin-task-so-that-i-can-see-the-usemin-task-in-action-usemin-task-with-reved-imgs" />
### usemin task with reved imgs
Given I run the 'rev usemin' task.

```js
// runt the usemin task
helpers.run("css rev usemin", done);
```

When the script ends.

```js
// not doing anything particularly usefull in this step
// but the hook is here if we need to
done();
```

Then '.test/usemin.html' should be the same as 'test/fixtures/usemin/index.html'.

```js
// todo: task log output doesn"t return things that were changed between
// <!-- build:<target> path/to/foo.js --> directives
helpers.copyFile(".test/usemin.html", "test/fixtures/usemin/reved.html");
helpers.assertFile(".test/usemin.html", "test/fixtures/usemin/reved.html");
done();
```

And I should see 'img/59928801.1.png' in '.test/usemin.html'.

```js
var test = new RegExp("img/59928801.1.png");
fs.readFile(".test/usemin.html", function(err, body) {
  if(err) return done(err);
  assert.ok(test.test(body));
  done();
});
```

And I should see 'img/f67f4a27.6.jpg' in '.test/css/style.css'.

```js
var test = new RegExp("img/f67f4a27.6.jpg");
fs.readFile(".test/css/e1823e1a.style.css", function(err, body) {
  if(err) return done(err);
  assert.ok(test.test(body), 'Missing reved img in style.css');
  done();
});
```

And I should see 'img/f67f4a27.6.jpg' in '.test/css/style.css'.

```js
var test = new RegExp("img/f67f4a27.6.jpg");
fs.readFile(".test/css/e1823e1a.style.css", function(err, body) {
  if(err) return done(err);
  assert.ok(test.test(body), 'Missing reved img in style.css');
  done();
});
```

