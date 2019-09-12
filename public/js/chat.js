const socket = io()

// Elements
const $messageForm = document.querySelector('#messageForm')
const $messageInput = document.querySelector('#message')
const $sendBtn = document.querySelector('#sendBtn')
const $shareLocationBtn = document.querySelector('#shareLocationBtn')
const $msgContainer = document.querySelector('#messageContainer')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

socket.on('message', (message) => {
    const content = Mustache.render(messageTemplate, {
        message: message.text,
        timestamp: moment(message.createdAt).format('hh:mm A')
    })
    $msgContainer.insertAdjacentHTML('beforeend', content)
})

socket.on('locationMessage', (location) => {
    const content = Mustache.render(locationTemplate, {
        locationHtml: location.url,
        timestamp: moment(location.createdAt).format('hh:mm A'),
        locationText: 'View Location'
    })
    $msgContainer.insertAdjacentHTML('beforeend', content)
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