const logEvents = require('./logEvents')

const EventEmitter = require('events')

class Emitter extends EventEmitter {}

// initialize object
const myEmitter = new Emitter()

//  add listener for the log event
myEmitter.on('customLog', (msg) => {
  logEvents(msg)
})

myEmitter.emit('customLog', 'Log event emitted')