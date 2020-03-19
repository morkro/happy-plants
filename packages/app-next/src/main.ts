import Vue from 'vue'
import App from './App.vue'
import { init as initSentry } from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import config from './config'
import router from './router'
import store from './store'
import errorHandler from './utils/vue-error-handler'
import './registerServiceWorker'
import './registerComponents'

const isProduction = process.env.NODE_ENV === 'production'

Vue.config.productionTip = isProduction
Vue.config.devtools = true
Vue.config.errorHandler = errorHandler

if (isProduction) {
  initSentry({
    release: 'pkg.version',
    dsn: config.sentry.dsn,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
