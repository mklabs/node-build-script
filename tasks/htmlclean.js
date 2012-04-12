
var path = require('path'),
  minifier = require('html-minifier');

//
// This task takes care of html minification through @kangax' html-minifier
// project
//
// > http://perfectionkills.com/experimenting-with-html-minifier/
//
// This is not a multi-task, but a simple one. The configuration is as follow:
//
//      ...
//      htmlclean: {
//        files: ['**/*.html']
//        options: {
//          ...
//        }
//      }
//      ...
//
// Usage:
//
//      grunt htmlclean:<type>
//
// Three "types" of html compression are supported. They maps the htmlclean
// options of h5bp/ant-build-script, except that types and configuration works
// in "reverse order" here. (eg. default type is most aggresive compression).
// And we at the moment only have two types of html compression.
//
// * default: (when `grunt htmlclean` is run) Agrresive html compression
//  (Most advanced optimization configuration, Full html minification)
//
// * minor: (when `grunt htmlclean:minor` is run) Intermediate html compression
//  (whitespace removed / comments removed)
//
// One very last thing this tasks needs to do is the minification of inlined styles / scripts.
//

module.exports = function(grunt) {

  grunt.registerTask('htmlclean', 'Basic to aggresive html minification', function(type) {
    var config = grunt.config('htmlclean') || {};
    grunt.config.requires('htmlclean.files', 'staging');

    grunt.log.writeln('Run htmlcompressor on ' + grunt.log.wordlist(config.files));

    // default type
    type = type || config.type || '';

    // prefix the defaults wildcard patterns with staging directory
    var staging = grunt.config('staging');

    var files = (Array.isArray(config.files) ? config.files : [config.files]).map(function(file) {
      return grunt.utils.join(staging, file);
    });

    files = grunt.file.expandFiles(files).map(function(file) {
      var body = grunt.file.read(file);
      return {
        file: file,
        body: body,
        minified: grunt.helper('htmlclean', body)
      }
    });

    // now write back to the disk each optimized html file
    files.forEach(function(file) {
      grunt.log.subhead(file.file);
      grunt.helper('min_max_info', file.minified, file.body);
      grunt.file.write(file.file, file.minified);
    });
  });

  //
  // **htmlclean** helper is a wrapper to html-minifier package, taking care of
  // html compression. See below for the full list of possiple options. Options
  // may be setup using `grunt.config('htmlclean.options')` in your gruntfile.
  //
  grunt.registerHelper('htmlclean', function(body, opts) {
    opts = opts || {};

    // > http://perfectionkills.com/experimenting-with-html-minifier/#options
    grunt.utils._.defaults(opts, grunt.config('htmlclean.options'), {
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      cleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeOptionalTags: true
    });

    return minifier.minify(body, opts);
  });

};

