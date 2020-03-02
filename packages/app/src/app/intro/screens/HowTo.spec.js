import { shallowMount, createLocalVue } from '@vue/test-utils'
import Box from '@happy-plants/shared/components/Box.vue'
import HowTo from '@/app/intro/screens/HowTo'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/intro/HowTo.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'better-dialog': '<div />',
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
