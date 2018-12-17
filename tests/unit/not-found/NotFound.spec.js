import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'

import NotFound from '@/app/not-found/NotFound'
import Button from '@/components/Button'
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
      'v-button': Button
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(NotFound, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('click to overview works', () => {
    const wrapper = shallowMount(NotFound, options)
    const button = wrapper.find(Button)
    wrapper.setMethods({ pushToSafety: jest.fn() })
    button.trigger('click')
    expect(wrapper.vm.pushToSafety).toHaveBeenCalled()
  })
})
