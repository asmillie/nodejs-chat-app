const app = require('./app')
const port = process.env.PORT

app.listen(port, () => console.log(`Chat App powered by ExpressJs running on port ${port}`))
