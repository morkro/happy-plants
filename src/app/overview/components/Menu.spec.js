import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueTouch from 'vue-touch'
import Router from 'vue-router'

import Menu from '@/app/overview/components/Menu'
import Button from '@/components/Button'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(VueTouch)
localVue.use(Router)

describe('app/overview/Menu.vue', () => {
  const options = {
    localVue,
    router,
    stubs: {
      'v-button': Button,
      'svgicon': '<svg />',
      'feather-trash': '<svg />',
      'feather-grid': '<svg />',
      'feather-x': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Menu, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('click on delete button emits', () => {
    const wrapper = shallowMount(Menu, options)
    const button = wrapper.find('.delete')

    button.trigger('click')
    expect(wrapper.emitted('clicked-item')).toBeTruthy()
    expect(wrapper.emitted('clicked-item')).toEqual([['delete']])
  })
})
