import { OrderByDirection } from 'firebase/firestore'
import pkg from '../package.json'

export enum PlantOrderType {
  Alphabetically = 'alphabetically',
  Latest = 'latest',
}

export type PlantOrderMap = [string, OrderByDirection]

interface Config {
  version: string
  isProductionMode: boolean
  meta: Record<string, string>
  localStorage: Record<string, string>
  ui: {
    authLoaderTimeout: number
    plantOrderMap: Map<PlantOrderType, PlantOrderMap>
  }
  api: {
    sentry: Record<string, string>
    firebase: Record<string, string>
  }
}

const config: Config = {
  version: pkg.version,
  isProductionMode: process.env.NODE_ENV === 'production',
  meta: {
    title: 'HappyPlants',
  },
  localStorage: {
    userAuthProgress: 'user:auth:progress',
    userAnimationPreference: 'user:preferences:animations',
    homeOrderBy: 'view:home:orderby',
    homeShowPlantCategorys: 'view:home:showPlantCategorys',
    homeViewmode: 'view:home:viewmode',
    plantCount: 'data:plants:count',
  },
  ui: {
    authLoaderTimeout: 4000,
    plantOrderMap: new Map([
      [PlantOrderType.Alphabetically, ['name', 'asc']],
      [PlantOrderType.Latest, ['created', 'desc']],
    ]),
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
