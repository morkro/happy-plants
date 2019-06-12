import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import localforage from 'localforage'
import { extendPrototype } from 'localforage-startswith'
import { init as initSentry } from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import App from '@/app/App'
import router from '@/router'
import store from '@/store'
import pkg from '#/package.json'

import './registerComponents'
import './registerServiceWorker'
import './registerVueDependencies'

/**
 * This is required as Webpack seems to do some static analysis
 * and breaking the module.
 * @see https://github.com/localForage/localForage-startsWith/issues/5
 */
extendPrototype(localforage)

localforage.config({
  name: 'happy-plants',
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE]
})

if (process.env.NODE_ENV === 'production') {
  initSentry({
    release: pkg.version,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.Vue({
      Vue,
      attachProps: true
    })]
  })
}

sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
