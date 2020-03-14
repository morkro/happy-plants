import { shallowMount, createLocalVue } from '@vue/test-utils'
import { ArrowLeftIcon } from 'vue-feather-icons'
import Box from '@/components/Box'
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
      svgicon: '<div />',
      'v-box': Box,
      'feather-left': ArrowLeftIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(HowTo, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
