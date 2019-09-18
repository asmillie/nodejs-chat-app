const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const { generateMessage, locationMessage } = require('./utils/message.utils')
const {
    getUser,
    getUsersInRoom,
    addUser,
    removeUser
} = require('./utils/users.utils')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PUBLIC_PATH = path.join(__dirname, '../public/')

app.use(express.static(PUBLIC_PATH))

io.on('connection', (socket) => {
    console.log('New web socket connection')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }
        
        socket.join(user.room)

        socket.emit('message', generateMessage('admin', 'Welcome to chat app'))
        socket.broadcast.to(user.room).emit('message', generateMessage('admin', `${user.name} has joined the chat`))
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        const user = getUser(socket.id)

        if (!user) {
            return callback('User does not exist')
        }

        if (filter.isProfane(message)) {
            return callback('Profanity not allowed')
        }

        io.to(user.room).emit('message', generateMessage(user.name, message))
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id)

        if (!user) {
            return callback('User does not exist')
        }

        io.to(user.room).emit('locationMessage', locationMessage(user.name, location))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('admin', `${user.name} has left the chat`))
        }        
    })
})

module.exports = server