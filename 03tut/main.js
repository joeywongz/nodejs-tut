const logEvents = require('./logEvents')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter()

//  add listener for the log event
myEmitter.on('customLog', (msg) => {
  logEvents(msg)
})

myEmitter.emit('customLog', 'Log event emitted')