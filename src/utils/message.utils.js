const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

const locationMessage = (location) => {
    return {
        url: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    locationMessage
}