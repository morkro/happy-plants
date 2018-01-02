import { mount } from 'vue-test-utils'
import Alert from '@/components/Alert'

describe('Alert.vue', () => {
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

  it(`emits event when calling 'emitAlertClose' method`, () => {
    const wrapper = mount(Alert)
    wrapper.vm.emitAlertClose()

    expect(wrapper.emitted('close-alert')).to.exist.and.deep.equal([[]])
    expect(wrapper.emitted('close-alert').length).to.equal(1)
  })
})
