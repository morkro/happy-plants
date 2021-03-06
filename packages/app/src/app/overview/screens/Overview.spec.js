import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueSVGIcon from 'vue-svgicon'

import Overview from '@/app/overview/screens/Overview'
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
      'better-dialog': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Overview, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
