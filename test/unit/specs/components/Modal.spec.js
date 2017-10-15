import { mount } from 'avoriaz'
import Modal from '@/components/Modal'

describe('Modal.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Modal)
    expect(wrapper.isVueComponent).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(Modal, { propsData: {} })
    expect(wrapper.vm.$props.show).to.equal(false)
    expect(wrapper.vm.$props.backgroundColor).to.equal('#F5F5F5')
  })
})
