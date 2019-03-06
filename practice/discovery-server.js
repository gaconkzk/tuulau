const net = require('net')
const pump = require('pump')
const fs = require('fs')

const server = net.createServer((soc) => {
  pump(fs.createReadStream(__filename), soc)
})

server.listen(3000, () => {
  console.log('server is listening on port 3000...')

  const DC = require('discovery-channel')
  const channel = DC()

  channel.join('tuuluu-3369', 3000)
})
