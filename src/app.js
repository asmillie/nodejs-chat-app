const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PUBLIC_PATH = path.join(__dirname, '../public/')

app.use(express.static(PUBLIC_PATH))

io.on('connection', () => {
    console.log('New web socket connection')
})

module.exports = server