const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Index.js')
})

module.exports = app