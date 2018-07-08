import { mount } from '@vue/test-utils'
import AppNotifications from '@/components/AppNotifications'

describe('components/AppNotifications.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(AppNotifications)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(AppNotifications)
    expect(wrapper.props().message).toEqual(false)
  })

  it(`is an empty element when no message is given`, () => {
    const wrapper = mount(AppNotifications)
    expect(wrapper.isEmpty()).toEqual(true)
  })

  it('renders wrapper and message when message prop is given', () => {
    const wrapper = mount(AppNotifications, { propsData: { message: 'Foo!' } })
    expect(wrapper.classes()).toContain('notification-wrapper')
    expect(wrapper.text().trim()).toEqual('Foo!')
  })
})
