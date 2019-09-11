const socket = io()

// Elements
const $messageForm = document.querySelector('#messageForm')
const $messageInput = document.querySelector('#message')
const $sendBtn = document.querySelector('#sendBtn')
const $shareLocationBtn = document.querySelector('#shareLocationBtn')

const $msgContainer = document.querySelector('#messageContainer')
socket.on('message', (msg) => {
    $msgContainer.insertAdjacentHTML('beforeend', `<p>${msg}</p>`)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $sendBtn.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message
    socket.emit('sendMessage', message.value, (error) => {
        $sendBtn.removeAttribute('disabled')
        $messageInput.value = ''
        $messageInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message Delivered')
    })
})

$shareLocationBtn.addEventListener('click', (e) => { 

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by current browser.');
    }

    $shareLocationBtn.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        socket.emit('sendLocation', coords, () => {
            console.log('Location shared')
            $shareLocationBtn.removeAttribute('disabled')
        })
    })
})