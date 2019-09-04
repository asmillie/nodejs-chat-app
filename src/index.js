const express = require('express')

const app = express()
const port = process.env.PORT | 3000

app.get('/', (req, res) => {
    res.send('Index.js')
})

app.listen(port, () => console.log(`Chat App powered by ExpressJs running on port ${port}`))
