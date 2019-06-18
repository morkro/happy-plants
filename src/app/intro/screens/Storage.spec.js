import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'

import Storage from '@/app/intro/screens/Storage'
import Box from '@/components/Box'
import store from '@/store'
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

  // it('updateStorageMethod() works as expected', () => {
  //   const wrapper = shallowMount(Storage, options)
  //   wrapper.vm.updateStorageMethod('cloud')
  //   expect(store.state.storage.type).toEqual('cloud')
  //   wrapper.vm.updateStorageMethod('local')
  //   expect(store.state.storage.type).toEqual('local')
  // })
})
