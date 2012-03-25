

module.exports = wrapper;

function wrapper() {
  this.Given(/^I am on the "([^"]*)" page$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^I should have a "([^"]*)" css file$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });
}
