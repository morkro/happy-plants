interface AppConfig {
  version: string
  isProduction: boolean
  sentry: {
    dsn: string
  }
  firebase: {
    apiKey: string
    authDomain: string
    databaseURL: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
  }
}

const config: AppConfig = {
  version: '2.0.0',
  isProduction: process.env.NODE_ENV === 'production',
  sentry: {
    dsn: process.env.VUE_APP_SENTRY_DSN,
  },
  firebase: {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID,
  },
}

export default config
