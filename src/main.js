import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueSVGIcon from 'vue-svgicon'
import VueA11yDialog from 'vue-a11y-dialog'
import { sync } from 'vuex-router-sync'
import localforage from 'localforage'
import { extendPrototype } from 'localforage-startswith'
import './registerServiceWorker'

import App from '@/app/App'
import router from '@/router'
import store from '@/store'
import observeVisibility from '@/utils/vue-observe-visibility'
import formatDateFilter from '@/utils/vue-format-date'
import LazyLoadDirective from '@/utils/vue-lazy-load-directive'

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

// Temporary fix to clean up DB.
localforage.keys()
  .then(keys => {
    if (keys.includes('undefined')) {
      localforage.removeItem('undefined')
    }
  })

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.config.devtools = true
Vue.config.errorHandler = function (err, vm, info) {
  console.log('[Global Error Handler]: Error in ' + info + ': ' + err) // eslint-disable-line no-console
}

VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

Vue.directive('lazyload', LazyLoadDirective)

Vue.use(observeVisibility)
Vue.use(formatDateFilter)
Vue.use(VueSVGIcon)
Vue.use(VueTouch)
Vue.use(VueA11yDialog)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
