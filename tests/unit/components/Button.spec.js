import { mount } from '@vue/test-utils'
import Button from '@/components/Button'

describe('components/Button.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Button)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(Button)
    expect(wrapper.props().loading).toBe(false)
    expect(wrapper.props().color).toEqual('default')
    expect(wrapper.props().type).toEqual('normal')
  })
})
