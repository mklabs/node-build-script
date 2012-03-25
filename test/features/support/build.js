// features/support/world.js

var zombie = require('zombie');

exports.World = Build;

function Build(callback) {

  // this.browser will be available in step definitions
  this.browser = new zombie.Browser();

  this.visit = function(url, callback) {
    this.browser.visit(url, callback);
  };

  callback();
}

