const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises

const logEvents = require('./logEvents')
const EventEmitter = require('events')
class Emitter extends EventEmitter {}
// initialize object
const myEmitter = new Emitter()

const PORT = process.env.PORT || 3500

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8')
    response.writeHead(200, { 'Content-Type': contentType })
    response.end(data)
  } catch (err) {
    console.log(err)
    response.statusCode = 500
    response.end()
  }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)
  const extension = path.extname(req.url)
  let contentType

  switch (extension) {
    case '.css':
      contentType = 'text/css'
      break
    case '.js':
      contentType = 'text/javascript'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.jpg':
      contentType = 'image/jpeg'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.txt':
      contentType = 'text/plain'
      break
    default:
      contentType = 'text/html'
  }
  console.log(contentType);
  let filePath =
    req.url === '/' && contentType === 'text/html'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1)
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url)

  //makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

  const fileExist = fs.existsSync(filePath)

  if (fileExist) {
    serveFile(filePath, contentType, res)
  } else {
    //404
    //301 redirect
    console.log(path.parse(filePath));
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' })
        res.end()
        break
      case 'www-page.html':
        res.writeHead(301, { Loation: '/' })
        res.end()
        break
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), contentType, res)
    }
  }
})

server.listen(PORT, () => console.log(`Server running in port ${PORT}`))
