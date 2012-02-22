
var path = require('path'),
  rimraf = require('rimraf');

// npm posttest script


// Wipes out build dirs created during the tests.
//
// Even though the clean task handle this, I'd rather clean out the fixtures //
// directory / upstream html5-boilerplate repo.

console.log('Cleaning out the directories created');

['intermediate', 'publish', 'staging', 'production'].map(function(dir) {
  return path.resolve('test/fixtures/h5bp', dir);
}).forEach(rimraf.sync);
