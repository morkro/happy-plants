import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'

import NotFound from '@/app/not-found/NotFound'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

describe('app/not-found/NotFound.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'feather-home': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = mount(NotFound, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
