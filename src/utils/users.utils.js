const users = []

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room.toLowerCase())
}

const addUser = ({ id, name, room }) => {
    // Validate
    if (!name || !room) {
        return {
            error: 'Name and room are required'
        }
    }

    // Sanitize
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()    

    const userExists = users.find((user) => {
        return user.room === room && user.name === name
    })

    if (userExists) {
        return {
            error: 'Name already exists'
        }
    }

    // Save user
    const user = {
        id, 
        name,
        room
    }
    
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0]
    }
}

module.exports = {
    getUser,
    getUsersInRoom,
    addUser,
    removeUser
}