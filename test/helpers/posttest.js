
var rimraf = require('rimraf');

// npm posttest script


// Wipes out build dirs created during the tests.
//
// Even though the clean task handle this, I'd rather clean out the fixtures //
// directory / upstream html5-boilerplate repo.

console.log('Cleaning out the intermediate / publish directories created');

['test/fixtures/h5bp/intermediate', 'test/fixtures/h5bp/publish'].forEach(rimraf.sync);
