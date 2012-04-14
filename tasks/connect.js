
var fs = require('fs'),
  path = require('path'),
  url = require('url'),
  socketio = require('socket.io'),
  connect = require('connect'),
  mime = connect.static.mime;


var clientScript = path.join(__dirname, '../../lib/support/socket-enable.js');

module.exports = function(grunt) {

  var task = grunt.task,
    config = grunt.config,
    file = grunt.file,
    log = grunt.log,
    _ = grunt.utils._;

  // reload tasks, works in tandem with connect task
  task.registerTask('emit', 'A basic task that emits events over socket.io', function() {
    var sockets = config('sockets'),
      errors = config('errors') || [];

    if(sockets) Object.keys(sockets).forEach(function(s) {
      if(errors.length) return sockets[s].emit('error', errors);
      sockets[s].emit('changed');
    });
  });

  task.registerTask('connect', 'Spawns up a local http server with socket.io enabled', function() {
    this.requiresConfig('connect');

    var data = config('connect'),
      targets = Object.keys(data);

    targets.forEach(function(target) {
      task.helper('connect', data[target], target);
    });

    this.async();
  });


  // #### helper:connect
  //
  // serve task, this one will use raw express (or just connect, should be enough)
  // application with socket.io connection setup.
  //
  // It works by injecting a tiny client-side script on any `*.html` request (might be better
  // if done on any `content-type: text/html`, this way it would be able to catch up requests,
  // even those serving dynamic content, not just statics). That client side establish
  // a new websocket connection and retrigger a page reload whenever the `changed` event is emitted.
  //
  //
  // The server spawn is wrapped up in a grunt task, and set to the config a new `socket` object,
  // when a new client side connection is done.
  //
  //    task.registerTask('connect-watch', 'connect watch:reload');
  //
  // The `watch:reload` is setup to fire the `foo` tasks, whose role is to simply emit
  // the `changed` event on the socket that might have been stored through `config('socket')`.
  //
  // todo: that tasks begins to get pretty long, might be worth moving the custom middleware, into
  // a grunt helper or a simple function defined elsewhere (probably in its own module)
  task.registerHelper('connect', function(data, name) {

    // path
    var dirname = path.resolve(name);

    log.subhead('Spawning http server from dirname ' + dirname + ' on port: ' + data.port);

    // setup the server
    var server = connect();

    // client-side template
    var ioScript = _.template(file.read(clientScript));

    // setup socketio
    var io = socketio.listen(server);
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.enable('browser client gzip');
    io.set('log level', 5);

    // store the socket object in grunt's config, so that we can interract from other tasks
    io.sockets.on('connection', function(socket) {
      var sockets = config('sockets') || {};
      // should support multiple-connections

      // should also catch up client disconnection and clean
      // the stored socket
      socket.on('disconnect', function() {
        if(sockets[socket.id]) delete sockets[socket.id];

        // restore sockets back in config
        config('sockets', sockets);
      });

      sockets[socket.id] = socket;
      config('sockets',  sockets);
    });

    // ignore favicon
    server.use(connect.favicon());

    // setup logs
    if(data.logs) server.use(connect.logger(data.logs));

    // custom static middleware, tricking the static one
    server.use(function(req, res, next) {
      // serve any static *.html, support of `index.html`
      var parsed = url.parse(req.url),

        // join / normalize from root dir
        filepath = path.normalize(path.join(dirname, decodeURIComponent(parsed.pathname))),

        // index.html support when trainling `/`
        index = path.normalize('/') === filepath.charAt(filepath.length - 1),

        ioResponse;

      if(index) filepath += 'index.html';

      // deal with our special socket.io client-side script
      if(path.basename(filepath) === 'socket-enable.js') {
        res.setHeader('Content-Type', mime.lookup('js'));
        ioResponse = ioScript(data);
        res.setHeader('Content-Length', ioResponse.length);
        return res.end(ioResponse);
      }

      fs.stat(filepath, function(e, stat) {
        // files do not exists, next with error only on unexpected errors
        if(e) return next((e.code === 'ENOENT' || 'ENAMETOOLONG' === e.code) ? null : e);

        // file is a dir, next to the directory listing if enabled
        if(stat.isDirectory()) return next();

        // anything that's not `*.html`, give back control to static / directory listing middleware
        if(path.extname(filepath) !== '.html') return next();

        // setup some basic headers, might add some. Below is pretty minimalist (might tweak and add
        // basic caching stuff for example)
        res.setHeader('Content-Type', mime.lookup(filepath));

        // can't use the ideal stream / pipe case, we need to alter the html response
        // by injecting that little socket.io client-side app.
        fs.readFile(filepath, 'utf8', function(e, body) {
          if(e) return next(e);

          body = body.replace(/<\/body>/, function(w) {
            return [
              '  <script defer src="/socket.io/socket.io.js"></script>',
              '  <script defer src="/socket-enable.js"></script>',
              w
            ].join('\n');
          });

          res.end(body);
        });
      });
    });

    // static files
    server.use(connect.static(dirname));

    // directory serving
    if(data.dirs) server.use(connect.directory(dirname));

    // start the server
    server.listen(data.port);

    log.writeln('Serving ' + dirname.bold + ' on port ' + data.port);

  });


};


