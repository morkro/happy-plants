const express = require('express')
const helmet = require('helmet')
const history = require('connect-history-api-fallback')

const app = express()
const port = process.env.PORT || 3000

app.use(history())
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(helmet.dnsPrefetchControl())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.noSniff())
app.use(helmet.xssFilter())
app.use(express.static('./dist'))

app.listen(port, () => {
  console.log('🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵')
  console.log(`Happy Plants enjoying the sun at port ${port} 🌐`)
})
