import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import localforage from 'localforage'

import App from '@/App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VeeValidate)

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'happy-plants'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
