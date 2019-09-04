const express = require('express')
const path = require('path')

const app = express()

const PUBLIC_PATH = path.join(__dirname, '../public/')

app.use(express.static(PUBLIC_PATH))

module.exports = app