const socket = io()

const msgContainer = document.querySelector('#messageContainer')
socket.on('message', (msg) => {
    msgContainer.insertAdjacentHTML('beforeend', `<p>${msg}</p>`)
})

const sendBtn = document.querySelector('#sendBtn')
sendBtn.addEventListener('click', () => {
    event.preventDefault()
    const message = document.querySelector('#message')
    socket.emit('sendMessage', message.value)
    message.value = ''
})

