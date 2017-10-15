import { mount } from 'avoriaz'
import AppNotifications from '@/components/AppNotifications'

describe('AppNotifications.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(AppNotifications)
    expect(wrapper.isVueComponent).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(AppNotifications, { propsData: {} })
    expect(wrapper.vm.$props.message).to.equal(false)
  })
})
