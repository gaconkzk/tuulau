const crypto = require('crypto')
const fs = require('fs')

const hash = crypto.createHash('sha256')
const stream = fs.createReadStream(__filename)
stream.on('data', (chunk) => {
  hash.update(chunk)
  console.log(hash.digest('hex'))
})
