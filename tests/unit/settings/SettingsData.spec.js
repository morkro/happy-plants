import { shallowMount, createLocalVue } from '@vue/test-utils'
import SettingsData from '@/app/settings/components/SettingsData'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/SettingsData.vue', () => {
  const options = {
    localVue,
    store,
    router
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(SettingsData, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
