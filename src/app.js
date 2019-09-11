const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PUBLIC_PATH = path.join(__dirname, '../public/')

app.use(express.static(PUBLIC_PATH))

io.on('connection', (socket) => {
    console.log('New web socket connection')

    socket.emit('message', 'Welcome to chat app')
    socket.broadcast.emit('message', 'User has joined')

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity not allowed')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User has left')
    })
})

module.exports = server