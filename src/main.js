import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueSVGIcon from 'vue-svgicon'
import VueLocalForage from '@/plugins/VueLocalForage'

import App from '@/App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueLocalForage, { name: 'happy-plants', driver: ['INDEXEDDB', 'LOCALSTORAGE'] })
Vue.use(VueSVGIcon, { tagName: 'svg-icon' })
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
