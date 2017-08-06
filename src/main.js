import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueSVGIcon from 'vue-svgicon'
import { sync } from 'vuex-router-sync'
import localforage from 'localforage'
import 'localforage-startswith'

import App from '@/app/App'
import router from './router'
import store from './store'

localforage.config({
  name: 'happy-plants',
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE]
})

console.log(localforage)

Vue.config.productionTip = false
Vue.use(VueTouch)
Vue.use(VueSVGIcon, { tagName: 'svg-icon' })

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
