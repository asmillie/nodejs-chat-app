const socket = io()

const msgContainer = document.querySelector('#messageContainer')
socket.on('message', (msg) => {
    msgContainer.insertAdjacentHTML('beforeend', `<p>${msg}</p>`)
})

document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message
    socket.emit('sendMessage', message.value)
    message.value = ''
})

document.querySelector('#shareLocationBtn').addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by current browser.');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})