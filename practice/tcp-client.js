const net = require('net')
const fs = require('fs')
const pump = require('pump')

const stream = net.connect(3000, 'localhost')

const fstream = fs.createWriteStream(`file-${Date.now()}`)

pump(stream, fstream)
