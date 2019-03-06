const http = require('http')
const pump = require('pump')
const fs = require('fs')

const source = (path) => fs.createReadStream(path)

const pipe = (s, d) => {
  pump(s, d)
}

server = http.createServer((req, res) => {
  pipe(source(__filename), res)
})

server.listen(3000, (err) => {
  if (err) {
    return console.log('Error starting server', err)
  }

  console.log('Server started...')
})
