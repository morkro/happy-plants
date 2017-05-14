import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueSVGIcon from 'vue-svgicon'
import localforage from 'localforage'

import App from '@/App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(VueSVGIcon, { tagName: 'svg-icon' })

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'happy-plants'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
