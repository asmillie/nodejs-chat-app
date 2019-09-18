const generateMessage = (name, text) => {
    return {
        name,
        text,
        createdAt: new Date().getTime()
    }
}

const locationMessage = (name, location) => {
    return {
        name,
        url: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    locationMessage
}