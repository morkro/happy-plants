import pkg from '../package.json'

export interface AppConfig {
  port: number
  version: string
  isProduction: boolean
  sentry: {
    dsn: string
  }
  firebase: {
    serviceAccountToken: string
    databaseURL: string
  }
}

const config: AppConfig = {
  port: 3000,
  version: pkg.version,
  isProduction: process.env.NODE_ENV === 'production',
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  firebase: {
    serviceAccountToken: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    databaseURL: 'https://happy-plants-app.firebaseio.com',
  },
}

export default config
