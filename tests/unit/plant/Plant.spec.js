import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import VueSVGIcon from 'vue-svgicon'
import 'localforage-startswith'

import Plant from '@/app/plant/Plant'
import observeVisibility from '@/utils/vue-observe-visibility'
import formatDateFilter from '@/utils/vue-format-date'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(VueTouch)
localVue.use(VueSVGIcon)
localVue.use(observeVisibility)
localVue.use(formatDateFilter)

describe('app/plant/Plant.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'a11y-dialog': '<div class="happy-dialog-base" />',
      'feather-trash': '<svg />',
      'feather-check': '<svg />',
      'feather-droplet': '<svg />',
      'feather-sun': '<svg />',
      'feather-moon': '<svg />',
      'feather-book': '<svg />',
      'feather-box': '<svg />',
      'feather-x': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = mount(Plant, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
