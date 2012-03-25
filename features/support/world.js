// features/support/world.js

var zombie = require('zombie');

exports.World = WorldConstructor;

function WorldConstructor(callback) {
  // this.browser will be available in step definitions
  this.browser = new zombie.Browser();

  this.visit = function(url, callback) {
    this.browser.visit(url, callback);
  };

  console.log('call');

  callback();
}

