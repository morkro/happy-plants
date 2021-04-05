interface Config {
  isProductionMode: boolean
  meta: Record<string, string>
  session: Record<string, string>
  ui: {
    authLoaderTimeout: number
  }
  api: {
    sentry: Record<string, string>
    firebase: Record<string, string>
  }
}

const config: Config = {
  isProductionMode: process.env.NODE_ENV === 'production',
  meta: {
    title: 'HappyPlants',
  },
  session: {
    signInProgress: 'USER_SIGNIN_PROGRESS',
  },
  ui: {
    authLoaderTimeout: 4000,
  },
  api: {
    sentry: {
      dsn: process.env.REACT_APP_SENTRY_DSN || '',
    },
    firebase: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
      appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || '',
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_ID || '',
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    },
  },
}

export default config
