// This is the main html5-boilerplate build configuration file.
//
//
//    task.registerTask('default', 'intro clean mkdirs usemin concat min css manifest copy');

config.init({

  pkg: '<json:package.json>',

  intro: {
    pkg: '<config:pkg>'
  },

  clean: '<config:mkdirs>',

  mkdirs: {
    intermediate: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' '),
    publish: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' ')
  },

  concat: {
    'intermediate/js/libs.js': [ 'js/mylibs/*' ],
    'intermediate/js/scripts.js': [ 'js/plugins.js', 'js/script.js' ],
    'intermediate/css/style.css': [ 'css/*.css' ]
  },

  css: {
    'publish/css/style.css': [ 'css/style.css' ]
  },

  min: {
    'publish/js/libs.js': [ 'intermediate/js/libs.js' ],
    'publish/js/scripts.js': [ 'intermediate/js/scripts.js' ]
  },

  rev: {
    js: ['publish/js/*.js'],
    css: ['publish/css/*.css'],
    img: ['publish/img/*']
  },

  usemin: {
    files: ['publish/*.html']
  },

  manifest: '<config:usemin>',

  lint: {
    files: ['js/*.js'],
    build: ['grunt.js', 'build/tasks/*.js']
  },

  watch: {
    files: '<config:lint.build>',
    tasks: 'lint:build',

    reload: {
      files: '<config:lint.build>',
      tasks: 'foo'
    }
  },

  serve: {
    intermediate: { port: 3000 },
    publish: { port: 3001 }
  },

  connect: {
    intermediate: {
      port: 3000,
      logs: 'dev',
      dirs: true
    },
    publish: {
      port: 3001,
      logs: 'default',
      dirs: true
    }
  },

  foo: {
    bar: []
  }

});

// Run the following tasks...
task.registerTask('default', 'lint:build intro clean mkdirs concat css min rev usemin manifest serve');
task.registerTask('nolint', 'intro clean mkdirs concat css min rev usemin manifest');

task.registerTask('connect-watch', 'connect watch:reload');
