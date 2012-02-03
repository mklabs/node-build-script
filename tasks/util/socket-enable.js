(function() {

  var url = 'http://<%= hostname %>:<%= port %>';
    socket = io.connect(url);

  // watched files just changed, reload page.
  // also retrigger on reconnect event
  socket
    .on('changed', location.reload.bind(location))
    .on('reconnect', location.reload.bind(location))
    .on('error', function(errors) {
      console.log(errors);

      var div = document.createElement('div'),
        errDiv = document.getElementById('mockerie-error'),
        first = document.body.querySelector('*');

      div.innerHTML = errors.map(function(err) {
        return err.msg;
      }).join('<hr \/>');

      div.id = 'mockerie-error';
      div.style.color = '#b94a48';
      div.style.padding = '1em';
      div.style.backgroundColor = '#f2dede';
      div.style.borderColor = '#eed3d7';

      if(errDiv) errDiv.innerHTML = div.innerHTML;
      else document.body.insertBefore(div, first);

    })

})();
