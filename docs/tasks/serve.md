# Task - serve

Serve is a utility task that will spawn a local http server on top of
generated build dirs, intermediate/ and publish/.

intermediate/ will basically include any files that were concat'd, but
not minified / versioned. publish/ is the final build results.

```js
serve: {
  intermediate: { port: 3000 },
  publish: { port: 3001 }
},
```

The only configurable option here is the port, but other relevant config
may be added soon (logs format, hostname, should serve dirs as well,  etc.)

## Helpers

> todo
