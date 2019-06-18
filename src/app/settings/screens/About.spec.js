import { shallowMount, createLocalVue } from '@vue/test-utils'
import About from '@/app/settings/screens/About'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/screens/About.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'feather-github': '<div />',
      'feather-heart': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(About, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
