import Vue from 'vue'
import { init as initSentry } from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import firebase from '@/services/firebase'
import { getSessionEntry } from '@/services/sessionStorage'
import errorHandler from './utils/vueErrorHandler'
import logger from './utils/vueLogger'
import config from './config'
import { createApp } from './app'
import './registerServiceWorker'
import './registerPlugins'
import './registerComponents'

logger(
  "Hello, fellow developer 👋🏻\nInterested how this app is build? Well, it's open source! Go check it out on https://github.com/morkro/happy-plants 🤙🏼"
)

Vue.config.productionTip = config.isProduction
Vue.config.devtools = true
Vue.config.errorHandler = errorHandler

if (config.isProduction) {
  logger('Initialising Sentry')
  initSentry({
    release: 'pkg.version',
    dsn: config.sentry.dsn,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  })
}

const { app, store } = createApp()

if (!getSessionEntry('USER_SIGNIN_PROGRESS')) {
  firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
    if (user) {
      const idToken = await user.getIdToken()
      const details = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        idToken,
      }
      store.commit('user/assignDetails', details, { root: true })
    }

    app.$mount('#app')
  })
} else {
  app.$mount('#app')
}
