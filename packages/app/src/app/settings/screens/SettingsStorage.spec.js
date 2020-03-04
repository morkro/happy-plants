import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { CloudIcon, SmartphoneIcon, LoaderIcon, CheckIcon } from 'vue-feather-icons'
import SettingsStorage from '@/app/settings/screens/SettingsStorage'
import Button from '@/components/Button'
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
      'better-dialog': '<div />',
      'feather-cloud': CloudIcon,
      'feather-smartphone': SmartphoneIcon,
      'feather-loader': LoaderIcon,
      'feather-check': CheckIcon,
      'v-button': Button
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(SettingsStorage, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('watching authFromRedirect works as expected', async () => {
    const wrapper = shallowMount(SettingsStorage, options)
    wrapper.setMethods({ openDialog: jest.fn() })
    mutations.USER_REDIRECT_RESULT(store.state)
    await Vue.nextTick()
    expect(wrapper.vm.openDialog).toHaveBeenCalled()
  })
})
