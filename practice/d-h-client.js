const net = require('net')
const fs = require('fs')
const pump = require('pump')

const DC = require('discovery-channel')
const channel = DC({ dht: false })
const hasher = require('hash-of-stream')

const hash = process.argv[2] || 'tuuluu-3369'

channel.join(hash)

channel.once('peer', (id, peer, type) => {
  console.log('found a new peer %s:%s via %s: ', peer.host, peer.port, type)
  const soc = net.connect(peer.port, peer.host)
  const fname = `peer-file-${Date.now()}.js`
  const fstream = fs.createWriteStream(fname)
  
  console.log('fetching %s...', fname)
  
  pump(soc, fstream, (e) => {
    if (e) throw e
    channel.destroy()
    
    console.log('file received and stored as %s - validating...', fname)
    validate(fname, hash, (err) => {
      if (err) throw err
      console.log('File content is valid')
    })
  })
})

const validate = (f, h, cb) => {
  hasher(fs.createReadStream(f), (h2) => {
    if (h !== h2) cb(new Error('File hash is invalid! ' + h2))
    else cb()
  })
}
