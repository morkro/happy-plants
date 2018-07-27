import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueSVGIcon from 'vue-svgicon'

import Intro from '@/app/intro/Intro'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(VueSVGIcon)

describe('app/not-found/NotFound.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'feather-settings': '<svg />',
      'feather-grid': '<svg />',
      'feather-box': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = mount(Intro, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('lifecycle hook beforeDestroy is correctly fired', () => {
    const wrapper = mount(Intro, options)
    wrapper.setMethods({ updateAppHeader: jest.fn() })
    wrapper.destroy()
    expect(wrapper.vm.updateAppHeader).toHaveBeenCalled()
  })
})
