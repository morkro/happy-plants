import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'

import Storage from '@/app/intro/components/Storage'
import Box from '@/components/Box'
import store from '@/store'
import mutations from '@/store/mutations'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

describe('app/intro/Storage.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'v-box': Box,
      'better-dialog': '<div />',
      'auth-provider-list': '<div />',
      'feather-right': '<svg />',
      'feather-left': '<svg />',
      'feather-cloud': '<svg />',
      'feather-smartphone': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Storage, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('updateStorageMethod() works as expected', () => {
    const wrapper = shallowMount(Storage, options)
    wrapper.vm.updateStorageMethod('cloud')
    expect(wrapper.vm.showDialog).toBe(true)
    wrapper.vm.updateStorageMethod('local')
    expect(store.state.storage.type).toEqual('local')
  })

  it('loginUser() returns undefined if user is not authenticated', async () => {
    const wrapper = shallowMount(Storage, options)
    wrapper.setMethods({ signInUser: jest.fn(), closeDialog: jest.fn() })
    await wrapper.vm.loginUser()
    expect(wrapper.vm.signInUser).toHaveBeenCalled()
    expect(await wrapper.vm.loginUser()).toBeUndefined()
  })

  it('loginUser() works as expected', async () => {
    const payload = { user: { displayName: 'Foo', email: 'foo@bar.plant', uid: '0' } }
    const wrapper = shallowMount(Storage, options)

    wrapper.setMethods({ signInUser: jest.fn() })
    mutations.USER_AUTH_STATE_SUCCESS(store.state, payload)
    wrapper.vm.updateStorageMethod({ type: 'cloud' })

    await wrapper.vm.loginUser()
    expect(wrapper.vm.showDialog).toBe(false)
  })
})
