import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal'

/**
 * TODO:
 * - Test watcher
 */

describe('components/Modal.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.props().show).toBe(false)
    expect(wrapper.props().backgroundColor).toBe('#F5F5F5')
  })

  it(`is an empty element when 'show' props is false`, () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.isEmpty()).toBe(true)
  })

  it(`emits event when calling 'emitModalClose' method`, () => {
    const wrapper = shallowMount(Modal)
    wrapper.vm.emitModalClose()

    expect(wrapper.emitted('close-modal')).toEqual([[]])
    expect(wrapper.emitted('close-modal')).toHaveLength(1)
  })

  it(`click on wrapper should call 'emitModalClose'`, () => {
    const emitModalClose = jest.fn()
    const wrapper = shallowMount(Modal, {
      propsData: { show: true },
      methods: { emitModalClose }
    })
    wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(emitModalClose).toHaveBeenCalled()
  })
})
