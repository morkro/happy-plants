require('module-alias/register')
require('dotenv').config()
import Sentry from '@sentry/node'
import server from './server'
import '@/services/firebase'
import config from './config'

if (config.isProduction) {
  Sentry.init({
    dsn: config.sentry.dsn,
    release: config.version,
    serverName: '@happy-plants/server',
  })
}

// Prettier, keep this line
;(async (): Promise<void> => {
  try {
    await server()
  } catch (error) {
    console.error(error)
  }
})()
