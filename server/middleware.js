const helmet = require('helmet')
const history = require('connect-history-api-fallback')

function registerMiddleware (app) {
  app.use(history())
  app.use(helmet.frameguard({ action: 'sameorigin' }))
  app.use(helmet.dnsPrefetchControl())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.hsts())
  app.use(helmet.noSniff())
  app.use(helmet.xssFilter())
}

exports.register = registerMiddleware
