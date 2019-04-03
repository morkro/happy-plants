import { shallowMount, createLocalVue } from '@vue/test-utils'
import HowTo from '@/app/intro/components/HowTo'
import Box from '@/components/Box'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/intro/HowTo.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'portal-dialog': '<div />',
      'svgicon': '<div />',
      'v-box': Box,
      'feather-arrow-left': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(HowTo, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
