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
    messagingSenderId: string
    projectId: string
    storageBucket: string
  }
  localStorage: {
    homeOrderBy: string
    homeShowPlantTypes: string
    homeViewmode: string
    plantCount: string
  }
}

const config: AppConfig = {
  version: '',
  isProduction: process.env.NODE_ENV === 'production',
  sentry: {
    dsn: process.env.VUE_APP_SENTRY_DSN,
  },
  firebase: {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  },
  localStorage: {
    homeOrderBy: 'view:home-orderby',
    homeShowPlantTypes: 'view:home-showplanttypes',
    homeViewmode: 'view:home-viewmode',
    plantCount: 'data:plant-count',
  },
}

export default config
