import Vue from 'vue'
import { init as initSentry } from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import firebase from '@/services/firebase'
import { getSessionEntry } from '@/services/sessionStorage'
import errorHandler from './utils/vueErrorHandler'
import logger from './utils/vueLogger'
import config from './config'
import router from './router'
import store from './store'
import App from './App.vue'
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

let app: Vue
const createVueInstance = () =>
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')

if (!getSessionEntry('USER_SIGNIN_PROGRESS')) {
  firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
    if (!app) {
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

      app = createVueInstance()
    }
  })
} else {
  app = createVueInstance()
}
