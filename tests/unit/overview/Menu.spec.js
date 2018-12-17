import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueTouch from 'vue-touch'
import Menu from '@/app/overview/components/Menu'
import Button from '@/components/Button'

const localVue = createLocalVue()
localVue.use(VueTouch)

describe('app/overview/Menu.vue', () => {
  const options = {
    localVue,
    stubs: {
      'v-button': Button
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
