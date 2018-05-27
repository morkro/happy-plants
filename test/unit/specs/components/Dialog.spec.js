import { shallowMount } from '@vue/test-utils'
import Dialog from '@/components/Dialog'

/**
 * TODO:
 * - Test the slots
 * - Test watcher
 */

describe('components/Dialog.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(Dialog)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(Dialog)
    expect(wrapper.props().show).toBe(false)
    expect(wrapper.props().close).toBe(false)
    expect(wrapper.props().backgroundColor).toBe(false)
    expect(wrapper.props().type).toBe('normal')
  })

  it(`is an empty element when 'show' props is false`, () => {
    const wrapper = shallowMount(Dialog)
    expect(wrapper.isEmpty()).toBe(true)
  })

  it('sets correct type class', () => {
    const wrapper = shallowMount(Dialog, { propsData: { show: true } })
    expect(wrapper.find('.dialog-normal').exists()).toBe(true)

    wrapper.setProps({ show: true, type: 'super-type' })
    expect(wrapper.find('.dialog-super-type').exists()).toBe(true)
  })

  it(`emits event when calling 'emitDialogClose' method`, () => {
    const wrapper = shallowMount(Dialog)
    wrapper.vm.emitDialogClose()

    expect(wrapper.emitted('close-dialog')).toEqual([[]])
    expect(wrapper.emitted('close-dialog')).toHaveLength(1)
  })

  it(`click on wrapper should call 'emitDialogClose'`, () => {
    const emitDialogClose = jest.fn()
    const wrapper = shallowMount(Dialog, {
      propsData: { show: true },
      methods: { emitDialogClose }
    })
    wrapper.trigger('click')
    expect(emitDialogClose).toHaveBeenCalled()
  })

  it(`close button should be rendered and call 'emitDialogClose'`, () => {
    const emitDialogClose = jest.fn()
    const wrapper = shallowMount(Dialog, {
      propsData: { show: true, close: true },
      methods: { emitDialogClose }
    })

    const button = wrapper.find('.dialog-header button')
    expect(button.exists()).toBe(true)

    button.trigger('click')
    expect(emitDialogClose).toHaveBeenCalled()
  })
})
