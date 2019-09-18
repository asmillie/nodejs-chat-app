const socket = io()

// Elements
const $messageForm = document.querySelector('#messageForm')
const $messageInput = document.querySelector('#message')
const $sendBtn = document.querySelector('#sendBtn')
const $shareLocationBtn = document.querySelector('#shareLocationBtn')
const $msgContainer = document.querySelector('#messageContainer')
const $userListContainer = document.querySelector('#userListContainer')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const userListTemplate = document.querySelector('#userList-template').innerHTML

// Options
const { name, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', ({ name, text, createdAt }) => {
    const content = Mustache.render(messageTemplate, {
        name,
        message: text,
        timestamp: moment(createdAt).format('hh:mm A')
    })
    $msgContainer.insertAdjacentHTML('beforeend', content)
})

socket.on('locationMessage', ({ name, url, createdAt }) => {
    const content = Mustache.render(locationTemplate, {
        name,
        locationHtml: url,
        timestamp: moment(createdAt).format('hh:mm A'),
        locationText: 'View Location'
    })
    $msgContainer.insertAdjacentHTML('beforeend', content)
})

socket.on('onRoomChange', (data) => {
    const content = Mustache.render(userListTemplate, data)
    $userListContainer.innerHTML = ''
    $userListContainer.insertAdjacentHTML('beforeend', content)
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

socket.emit('join', { name, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})