const net = require('net')
const fs = require('fs')
const pump = require('pump')

const DC = require('discovery-channel')
const channel = DC({ dht: false })

channel.join('tuuluu-3369')

channel.once('peer', (id, peer) => {
  console.log('found a new peer', peer)
  const stream = net.connect(peer.port, peer.host)
  const fstream = fs.createWriteStream(`peer-file-${Date.now()}`)
  
  pump(stream, fstream, (e) => {
    channel.destroy()
  })
})
