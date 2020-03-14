import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueSVGIcon from 'vue-svgicon'

import Button from '@/components/Button'
import Box from '@/components/Box'
import Intro from '@/app/intro/screens/Intro'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(VueSVGIcon)

describe('app/intro/Intro.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'feather-settings': '<svg />',
      'feather-grid': '<svg />',
      'feather-box': '<svg />',
      'v-box': Box,
      'v-button': Button
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Intro, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('lifecycle hook beforeDestroy is correctly fired', () => {
    const wrapper = shallowMount(Intro, options)
    wrapper.setMethods({ updateAppHeader: jest.fn() })
    wrapper.destroy()
    expect(wrapper.vm.updateAppHeader).toHaveBeenCalled()
  })
})
