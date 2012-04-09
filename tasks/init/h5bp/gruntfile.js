var h5bp = require('node-build-script');

module.exports = function(grunt) {

  // extend the grunt.utils object with h5bp's utilities, wrapping  require
  // calls to utility libs (rimraf, ncp, mkdirp) as lazy-loaded getters.
  h5bp.utils.extend(grunt.utils);

  // Project configuration.
  grunt.initConfig({{% if (min_concat) { if (package_json) { %}
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
      '{%= staging %}/dist/{%= name %}-{%= version %}.js': ['js/**/*.js']
    },
    min: {
      '{%= output %}/dist/{%= name %}-{%= version %}.js': ['{%= staging %}/dist/{%= name %}-{% version %}.min.js']
    },{% } %}
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint {%= test_task %}'
    },

    // h5bp plugin task confit
    staging: '{%= staging %}',
    output: '{%= output %}',
    exclude: '.git* build/** node_modules/** grunt.js package.json *.md'.split(' '),
    mkdirs: {
      staging: '<config:exclude>',
      output: '<config:exclude>'
    },
    css: {
      '{%= output %}/css/style.css': ['{%= css_dir %}/**/*.css']
    },
    usemin: {
      files: ['{%= output %}/**/*.html']
    },
    rev: {
      js: '{%= js_dir %}/**/*.js',
      css: '{%= css_dir %}/**/*.css',
      img: '{%= img_dir %}/**'
    },

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
    uglify: {}{% } %}
  });

  // Default task.
  grunt.registerTask('default', 'clean mkdirs concat css min rev usemin');

};
