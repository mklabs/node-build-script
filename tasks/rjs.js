var fs = require('fs'),
	path = require('path'),
	rjs = require('requirejs');

module.exports = function(grunt) {
	grunt.task.registerMultiTask('rjs', 'Optimizes javascript that actually is built with requirejs.', function () {
		this.requiresConfig('rjs');

		grunt.helper('rjs:optimize:js', this.data, this.async());
	});

	grunt.registerHelper('rjs:optimize:js', function(file, options, cb) {
		if(!cb) { cb = options; options = {}; }
		options.baseUrl = './';
		options.appDir = 'js';
		options.dir = grunt.config('output')+options.appDir;
		options.modules = [{
			name: file
		}];
		rjs.optimize(options, function() {
			cb();
		});
	});

};
