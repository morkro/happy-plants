import Vue from 'vue'
import { init as initSentry } from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import firebase from '@/services/firebase'
import { getSessionEntry } from '@/services/sessionStorage'
import logger, { errorHandler } from './utils/vueLogger'
import config from './config'
import { createApp } from './app'
import './registerServiceWorker'
import './registerPlugins'
import './registerComponents'

// TODO: Top system bar color should match (manifest `theme_color`)

logger(
  "Hello, fellow developer 👋🏻\nInterested how this app is build? Well, it's open source! Go check it out on https://github.com/morkro/happy-plants 🤙🏼"
)

Vue.config.productionTip = config.isProduction
Vue.config.devtools = true
Vue.config.errorHandler = errorHandler

if (config.isProduction) {
  logger('Initialising Sentry')
  initSentry({
    release: config.version,
    dsn: config.sentry.dsn,
    integrations: [new VueIntegration({ Vue, attachProps: true } as any)],
  })
}

let app: Vue
const { create, store } = createApp()

if (!getSessionEntry('USER_SIGNIN_PROGRESS')) {
  firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
    if (user) {
      const idToken = await user.getIdToken()
      const details = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid,
        idToken,
      }

      store.commit('account/assignDetails', details, { root: true })
    }

    if (!app) {
      app = create()
      app.$mount('#app')
    }
  })
} else {
  app = create()
  app.$mount('#app')
}
