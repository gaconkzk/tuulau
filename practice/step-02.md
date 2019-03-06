# 1 - Streaming a file over HTTP.
---
Now that we know how to stream files let's do something more useful: Let's share files over http. Write a web server that streams a file via http.

## Tips
---
To write an http server, you will need the http core node module.

When writing an http server, usually with `http.createServer(function (req, res) { })`, the res parameter is a writable stream, so we can use the same tools we used in problem 1 to pipe the file to this stream.

You can build on the solution from the previous exercise. Here is ours:

```js
const pump = require('pump')
const fs = require('fs')

const source = (path) => fs.createReadStream(path)

const pipe = (s, d) => {
  pump(s, d, (e) => {
    console.log('pipe finished', e)
  })
}

pipe(source(__filename), process.stdout)
```

## Testing
---
To test your solution, run it with node.

```
node server.js
```

And access it via curl or a regular web browser. If your server is running on port 3000, then run

```
curl localhost:3000
```
Validate that it downloads (outputs) the file that you expect.
