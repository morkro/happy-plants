import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueCompositionApi from '@vue/composition-api'
import VueA11yDialog from 'vue-a11y-dialog'
import observeVisibility from '@/utils/vueObserveVisibility'
import formatDateFilter from '@/utils/vueFormatDate'
import queryProps from '@/utils/vueQueryProps'

import lazyLoad from './utils/lazyLoad'

Vue.directive('lazyload', lazyLoad)
Vue.use(observeVisibility)
Vue.use(queryProps)
Vue.use(formatDateFilter)
Vue.use(VueMeta)
Vue.use(VueCompositionApi)
Vue.use(VueA11yDialog)
