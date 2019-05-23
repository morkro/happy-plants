import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueSVGIcon from 'vue-svgicon'
import VueA11yDialog from 'vue-a11y-dialog'
import VueMQ from 'vue-mq'
import PortalVue from 'portal-vue'
import { sync } from 'vuex-router-sync'
import localforage from 'localforage'
import { extendPrototype } from 'localforage-startswith'
import { init as initSentry } from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import App from '@/app/App'
import router from '@/router'
import store from '@/store'
import observeVisibility from '@/utils/vue-observe-visibility'
import formatDateFilter from '@/utils/vue-format-date'
import LazyLoadDirective from '@/utils/vue-lazy-load-directive'
import errorHandler from '@/utils/vue-error-handler'
import pkg from '#/package.json'

import './registerComponents'
import './registerServiceWorker'

const isProduction = process.env.NODE_ENV === 'production'

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

/**
 * Vue configuration.
 */
Vue.config.productionTip = isProduction
Vue.config.devtools = true
Vue.config.errorHandler = errorHandler

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
Vue.use(VueMQ, {
  breakpoints: {
    phone: 600,
    desktop: 1100
  },
  defaultBreakpoint: 'phone'
})
Vue.use(PortalVue)

sync(store, router)

if (isProduction) {
  initSentry({
    release: pkg.version,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
