const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PUBLIC_PATH = path.join(__dirname, '../public/')

app.use(express.static(PUBLIC_PATH))

io.on('connection', (socket) => {
    console.log('New web socket connection')

    socket.emit('message', 'Welcome to chat app')
    socket.broadcast.emit('message', 'User has joined')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('sendLocation', (location) => {
        io.emit('message', `Location: ${location.longitude}, ${location.latitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User has left')
    })
})

module.exports = server