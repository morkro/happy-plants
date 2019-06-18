import { shallowMount, createLocalVue } from '@vue/test-utils'
import Storage from '@/app/settings/screens/Storage'
import Button from '@/components/Button'
import store from '@/store'
import mutations from '@/app/user/store/mutations'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/screens/Storage.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'better-dialog': '<div />',
      'feather-cloud': '<div />',
      'feather-smartphone': '<div />',
      'feather-loader': '<div />',
      'feather-check': '<div />',
      'v-button': Button
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Storage, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('watching authFromRedirect works as expected', () => {
    const wrapper = shallowMount(Storage, options)
    wrapper.setMethods({ openDialog: jest.fn() })
    mutations.USER_REDIRECT_RESULT(store.state)
    expect(wrapper.vm.openDialog).toHaveBeenCalled()
  })
})
