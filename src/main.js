import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'

import App from './App'
import router from './router'
import store from './store'

localforage.config({
  name: 'happy-plants'
})

Vue.config.productionTip = false
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
