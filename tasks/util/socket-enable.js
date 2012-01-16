(function() {

  // despite being read by grunt, this file doesn't actually define any grunt related tasks / helpers
  // this is the script that is injected while using the reload task

  // todo: templatize the script output. Needs the port to connect to.
  var url = 'http://localhost:<%= port %>',
    socket = io.connect(url);

  socket.on('changed', function(file, path, content) {
    console.log('socket', arguments);
    location.assign(location.pathname);
  });
})();

