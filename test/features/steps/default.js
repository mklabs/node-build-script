
Given(/I run the '(\w+)' task/, function() {
  // runt the $1 task
  helpers.run('$1', done);
});

When(/the script ends/, function(done) {
  // not doing particularly usefull in this step
  // but the hook is here is we need to
  done();
});

Then(/'(.+)' should be the same as '(.+)'/, function() {
  helpers.assertFile('$1', '$2');
  done();
});

Then(/'(.+)' dir should be the same as '(.+)'/, function() {
  helpers.assertFile('$1', '$2');
  done();
});
