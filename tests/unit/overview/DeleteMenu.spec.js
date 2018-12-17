import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueTouch from 'vue-touch'
import DeleteMenu from '@/app/overview/components/DeleteMenu'
import Button from '@/components/Button'

const localVue = createLocalVue()
localVue.use(VueTouch)

describe('app/overview/DeleteMenu.vue', () => {
  const options = {
    localVue,
    stubs: {
      'v-button': Button
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(DeleteMenu, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('click on delete button emits', () => {
    const wrapper = shallowMount(DeleteMenu, options)
    const button = wrapper.find('.delete')
    button.trigger('click')
    expect(wrapper.emitted('delete-selection')).toBeTruthy()
  })

  it('click on cancel button emits', () => {
    const wrapper = shallowMount(DeleteMenu, options)
    const button = wrapper.find('.cancel')
    button.trigger('click')
    expect(wrapper.emitted('cancel-selection')).toBeTruthy()
  })
})
