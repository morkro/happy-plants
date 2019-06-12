import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import VueA11yDialog from 'vue-a11y-dialog'
import VueMQ from 'vue-mq'
import VueTouch from 'vue-touch'
import PortalVue from 'portal-vue'

import observeVisibility from '@/utils/vue-observe-visibility'
import formatDateFilter from '@/utils/vue-format-date'
import LazyLoadDirective from '@/utils/vue-lazy-load-directive'
import errorHandler from '@/utils/vue-error-handler'

const MQ_CONFIG = {
  breakpoints: {
    phone: 600,
    desktop: 1100
  },
  defaultBreakpoint: 'phone'
}

Vue.config.productionTip = process.env.NODE_ENV === 'production'
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
Vue.use(VueMQ, MQ_CONFIG)
Vue.use(PortalVue)
