const net = require('net')
const pump = require('pump')
const fs = require('fs')

const server = net.createServer((soc) => {
  pump(fs.createReadStream(__filename), soc)
})

server.listen(3000)
