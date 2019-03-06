const pump = require('pump')
const fs = require('fs')

const source = (path) => fs.createReadStream(path)

const pipe = (s, d) => {
  pump(s, d, (e) => {
    console.log('pipe finished', e)
  })
}

pipe(source(__filename), process.stdout)
