import { mount } from 'vue-test-utils'
import sinon from 'sinon'
import Alert from '@/components/Alert'

/**
 * TODO:
 * - Test the slots
 * - Test watcher
 */

describe('components/Alert.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Alert)
    expect(wrapper.isVueInstance()).to.to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(Alert)
    expect(wrapper.props().show).to.equal(false)
    expect(wrapper.props().close).to.equal(false)
    expect(wrapper.props().backgroundColor).to.equal(false)
    expect(wrapper.props().type).to.equal('normal')
  })

  it(`is an empty element when 'show' props is false`, () => {
    const wrapper = mount(Alert)
    expect(wrapper.isEmpty()).to.equal(true)
  })

  it('sets correct type class', () => {
    const wrapper = mount(Alert, { propsData: { show: true } })
    expect(wrapper.find('.alert-normal').exists()).to.equal(true)

    wrapper.setProps({ show: true, type: 'super-type' })
    expect(wrapper.find('.alert-super-type').exists()).to.equal(true)
  })

  it(`emits event when calling 'emitAlertClose' method`, () => {
    const wrapper = mount(Alert)
    wrapper.vm.emitAlertClose()

    expect(wrapper.emitted('close-alert')).to.exist.and.deep.equal([[]])
    expect(wrapper.emitted('close-alert').length).to.equal(1)
  })

  it(`click on wrapper should call 'emitAlertClose'`, () => {
    const emitAlertClose = sinon.stub()
    const wrapper = mount(Alert, {
      propsData: { show: true },
      methods: { emitAlertClose }
    })
    wrapper.trigger('click')
    expect(emitAlertClose.called).to.equal(true)
  })

  it(`close button should be rendered and call 'emitAlertClose'`, () => {
    const emitAlertClose = sinon.stub()
    const wrapper = mount(Alert, {
      propsData: { show: true, close: true },
      methods: { emitAlertClose }
    })

    const button = wrapper.find('.alert-header button')
    expect(button.exists()).to.equal(true)

    button.trigger('click')
    expect(emitAlertClose.called).to.equal(true)
  })
})
