// This is the main html5-boilerplate build configuration file.
//
// Builds depends on two specific directory created during the process
// `intermediate/` and `publish/`, the first is used as a staging area, the
// second is the final result of the build that was run.
//
// These two values may be changed to something else with the `staging` and
// `output` config property below, and by changing any task config to match the new value.
//

config.init({
  // the staging directory used during the process
  staging: 'intermediate/',
  // final build output
  output: 'publish/',

  // mkdirs task - filter any files matching one of the below pattern
  exclude: 'build/** node_modules/** intermediate/** publish/** grunt.js package.json *.md'.split(' '),

  mkdirs: {
    staging: '<config:exclude>',
    output: '<config:exclude>'
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
