const express = require('express')
const middleware = require('./server/middleware')

const app = express()
const port = process.env.PORT || 3000

middleware.register(app)

app.use(express.static('./dist'))
app.listen(port, () => {
  console.log('🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵')
  console.log(`Happy Plants enjoying the sun at port ${port} 🌐`)
})
