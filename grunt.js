// This is the main html5-boilerplate build configuration file.
//
//
//    task.registerTask('default', 'intro clean mkdirs usemin concat min css manifest copy');

config.init({

  clean: '<config:mkdirs>',

  mkdirs: {
    intermediate: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' '),
    publish: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' ')
  },

  concat: {
    'intermediate/js/scripts.js': [ 'js/plugins.js', 'js/script.js' ],
    'intermediate/css/style.css': [ 'css/*.css' ]
  },

  css: {
    'publish/css/style.css': [ 'css/style.css' ]
  },

  min: {
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
    build: ['grunt.js', 'tasks/*.js']
  },

  watch: {
    files: ['js/*.js', 'css/**', '*.html'],
    tasks: 'default',

    reload: {
      files: '<config:watch.files>',
      tasks: 'default emit'
    }
  },

  serve: {
    intermediate: { port: 3000 },
    publish: { port: 3001 }
  },

  connect: {
    intermediate: {
      hostname: 'localhost',
      port: 3000,
      logs: 'dev',
      dirs: true
    },
    publish: {
      hostname: 'localhost',
      port: 3001,
      logs: 'default',
      dirs: true
    }
  }
});

// Run the following tasks...
task.registerTask('default', 'intro clean mkdirs concat css min rev usemin manifest');

task.registerTask('reload', 'connect watch:reload');
