/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // the staging directory used during the process
    staging: '{%= staging %}',
    // final build output
    output: '{%= output %}',

    // Create the build dirs
    mkdirs: {
      staging: './'
    },

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'css/style.css': ['{%= css_dir %}/**/*.css']
    },

    // Renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: '{%= js_dir %}/**/*.js',
      css: '{%= css_dir %}/**/*.css',
      img: '{%= img_dir %}/**'
    },

    // update references in html to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // html minification
    html: {
      files: '<config:usemin.html>'
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'lint {%= test_task %}'
    },

    {% if (min_concat || require_js) { if (package_json) { %}
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },{% } else { %}
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },{% } } %}
    lint: {
      files: ['grunt.js', '{%= js_dir %}/**/*.js', '{%= test_dir %}/**/*.js']
    },{% if (dom) { %}
    qunit: {
      files: ['{%= test_dir %}/**/*.html']
    },{% } else { %}
    test: {
      files: ['{%= test_dir %}/**/*.js']
    },{% } %}{% if (min_concat) { %}
    concat: {
      dist: {
        src: ['{%= js_dir %}/plugins.js', '{%= js_dir %}/main.js'],
        dest: '{%= js_dir %}/{%= name %}-{%= version %}.js'
      }
    },
    min: {
      dist: {
        src: '{%= js_dir %}/{%= name %}-{%= version %}.js',
        dest: '{%= js_dir %}/main.js'
      }
    },{% } %}
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true{% if (dom) { %},
        browser: true{% } %}
      },
      globals: {{% if (jquery) { %}
        jQuery: true
      {% } %}}
    }{% if (min_concat) { %},
    uglify: {}{% } %}{% if (require_js) { %},
    rjs: {
      modules: [{
        name: 'main',
      }],
      dir: 'js/',
      appDir: 'js',
      baseUrl: './',
      pragmas: {
        doExclude: true
      },
      skipModuleInsertion: false,
      optimizeAllPluginResources: true,
      findNestedDependencies: true
    }{% } %}
  });

  {% if (require_js) { %}
  // in rjs setup, the concat and min task are overriden to use rjs optimizr
  grunt.renameTask('concat', '_concat').registerTask('concat', 'rjs (noop)', function() {
    grunt.log.writeln('the concat in rjs setup is a noop, rjs optimizer somewhat replace js concatenation');
  });
  grunt.renameTask('min', '_min').registerTask('min', 'rjs');
  {% } %}

  // uncomment this line if you're using the build script as a grunt plugin
  // it should be installed locally, even better if put in your package.json's
  // dependency
  //
  // grunt.loadNpmTasks('node-build-script');
};
