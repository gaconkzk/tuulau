const net = require('net')
const pump = require('pump')
const fs = require('fs')
const DC = require('discovery-channel')

const server = net.createServer((soc) => {
  console.log('New peer connected: %s:%s', soc.remoteAddress, soc.remotePort)
  pump(fs.createReadStream(__filename), soc)
})

// calculate id using hash
const hasher = require('hash-of-stream')
hasher(fs.createReadStream(__filename), (hash) => startServer(hash))

const startServer = (id) =>{
  server.listen(3000, () => {
    // calculate id using hash
    const port = server.address().port
    const channel = DC()
  
    channel.join(id, port)
  
    console.log('server name %s is listening on port %d...', id, port)
  })  
}
