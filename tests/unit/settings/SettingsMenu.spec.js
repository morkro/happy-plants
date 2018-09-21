import { shallowMount, createLocalVue } from '@vue/test-utils'
import SettingsMenu from '@/app/settings/components/SettingsMenu'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/SettingsMenu.vue', () => {
  const options = {
    localVue,
    store,
    router
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(SettingsMenu, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('before destroying calls action when new release', () => {
    const wrapper = shallowMount(SettingsMenu, {
      ...options,
      computed: {
        hasNewRelease: () => true
      }
    })
    wrapper.setMethods({ hasSeenNewRelease: jest.fn() })
    wrapper.destroy()
    expect(wrapper.vm.hasSeenNewRelease).toHaveBeenCalled()
  })

  it('before destroying does nothing if no new release', () => {
    const wrapper = shallowMount(SettingsMenu, options)
    wrapper.setMethods({ hasSeenNewRelease: jest.fn() })
    wrapper.destroy()
    expect(wrapper.vm.hasSeenNewRelease).not.toHaveBeenCalled()
  })
})
