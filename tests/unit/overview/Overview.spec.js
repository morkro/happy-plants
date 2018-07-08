import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueSVGIcon from 'vue-svgicon'

import Overview from '@/app/overview/Overview'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(VueSVGIcon)

describe('app/overview/Overview.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'a11y-dialog': '<div class="happy-dialog-base" />',
      'feather-grid': '<svg />',
      'feather-x': '<svg />',
      'feather-box': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = mount(Overview, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
