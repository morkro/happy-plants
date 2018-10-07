import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button'

describe('components/Button.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.props().loading).toBe(false)
    expect(wrapper.props().color).toEqual('default')
    expect(wrapper.props().type).toEqual('normal')
  })
})
