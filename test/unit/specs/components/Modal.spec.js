import { mount } from 'vue-test-utils'
import sinon from 'sinon'
import Modal from '@/components/Modal'

/**
 * TODO:
 * - Test watcher
 */

describe('components/Modal.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Modal)
    expect(wrapper.isVueInstance()).to.to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(Modal)
    expect(wrapper.props().show).to.to.equal(false)
    expect(wrapper.props().backgroundColor).to.to.equal('#F5F5F5')
  })

  it(`is an empty element when 'show' props is false`, () => {
    const wrapper = mount(Modal)
    expect(wrapper.isEmpty()).to.equal(true)
  })

  it(`emits event when calling 'emitModalClose' method`, () => {
    const wrapper = mount(Modal)
    wrapper.vm.emitModalClose()

    expect(wrapper.emitted('close-modal')).to.exist.and.deep.equal([[]])
    expect(wrapper.emitted('close-modal').length).to.equal(1)
  })

  it(`click on wrapper should call 'emitModalClose'`, () => {
    const emitModalClose = sinon.stub()
    const wrapper = mount(Modal, {
      propsData: { show: true },
      methods: { emitModalClose }
    })
    wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(emitModalClose.called).to.equal(true)
  })
})
