import { OrderByDirection } from 'firebase/firestore'
import pkg from '../package.json'

export type HomeOrderMap = [string, OrderByDirection]

export enum HomeOrderBy {
  Alphabetically = 'alphabetically',
  Latest = 'latest',
}

export enum HomeViewmode {
  Grid = 'grid',
  List = 'list',
}

export enum HomeFilterBy {
  Tags = 'tags',
  Type = 'type',
}

interface Config {
  version: string
  isProductionMode: boolean
  meta: Record<string, string>
  localStorage: Record<string, string>
  ui: {
    authLoaderTimeout: number
    homeOrderMap: Map<HomeOrderBy, HomeOrderMap>
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
    homeViewmode: 'view:home:viewmode',
    homeOrderBy: 'view:home:orderby',
    homeFilterBy: 'view:home:homeFilterBy',
  },
  ui: {
    authLoaderTimeout: 4000,
    homeOrderMap: new Map([
      [HomeOrderBy.Alphabetically, ['name', 'asc']],
      [HomeOrderBy.Latest, ['created', 'desc']],
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
