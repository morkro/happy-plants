import { mount } from 'vue-test-utils'
import Modal from '@/components/Modal'

describe('Modal.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Modal)
    expect(wrapper.isVueInstance()).to.to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(Modal)
    expect(wrapper.props().show).to.to.equal(false)
    expect(wrapper.props().backgroundColor).to.to.equal('#F5F5F5')
  })
})
