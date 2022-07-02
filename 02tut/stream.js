const fs = require('fs')

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' })
const ws = fs.createWriteStream('./files/new-lorem.txt')

// rs.on('data', (dataChunk) => {
//   // console.log(dataChunk)
//   ws.write(datachunk)
// })

//a more efficient way
rs.pipe(ws)
