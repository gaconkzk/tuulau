const crypto = require('crypto')

const hash = crypto.createHash('sha256')

console.log(hash.update('Web Rebels 2017').digest('hex'))
