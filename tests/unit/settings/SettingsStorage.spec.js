import { shallowMount, createLocalVue } from '@vue/test-utils'
import SettingsStorage from '@/app/settings/components/SettingsStorage'
import store from '@/store'
import mutations from '@/store/mutations'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/SettingsStorage.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'portal-dialog': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(SettingsStorage, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('watching authFromRedirect works as expected', () => {
    const wrapper = shallowMount(SettingsStorage, options)
    wrapper.setMethods({ openDialog: jest.fn() })
    mutations.USER_REDIRECT_RESULT(store.state)
    expect(wrapper.vm.openDialog).toHaveBeenCalled()
  })
})
