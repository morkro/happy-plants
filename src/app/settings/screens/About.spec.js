import { shallowMount, createLocalVue } from '@vue/test-utils'
import SettingsAbout from '@/app/settings/screens/SettingsAbout'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/SettingsAbout.vue', () => {
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
    const wrapper = shallowMount(SettingsAbout, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
