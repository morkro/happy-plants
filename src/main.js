import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueSVGIcon from 'vue-svgicon'
import VueFire from 'vuefire'
import firebase from 'firebase'
import { sync } from 'vuex-router-sync'
import localforage from 'localforage'
import { extendPrototype } from 'localforage-startswith'

import App from '@/app/App'
import router from './router'
import store from './store'

/**
 * This is required as Webpack seems to do some static analysis
 * and breaking the module.
 * @see https://github.com/localForage/localForage-startsWith/issues/5
 */
extendPrototype(localforage)

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

localforage.config({
  name: 'happy-plants',
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE]
})

Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(VueFire)
Vue.use(VueSVGIcon)
Vue.use(VueTouch)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
