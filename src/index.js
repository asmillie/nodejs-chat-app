const server = require('./app')
const port = process.env.PORT

server.listen(port, () => console.log(`Chat App powered by ExpressJs running on port ${port}`))
