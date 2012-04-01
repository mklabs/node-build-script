# Task - connect

The connect is a special little utility task working in tandem with the
watch one.

It's a slight variation of the serve command, but includes / injects
some socket.io magic to be able to reload any opened webpage in your
browsers.

Basically, the idea is that anytime you change a watched files
(js/css/templates, etc.), a new build is triggered and an event is
emitted back to any connected clients to reload pages automatically.

```js
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

}
```

## Helpers

> todo
