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

  it('adds correct classes depending on props', () => {
    const wrapper = shallowMount(Button, { propsData: { type: ['small'] } })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['small']))
    wrapper.setProps({ type: ['normal', 'circle'] })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['normal', 'circle']))
  })

  it('renders a loading icon on prop change', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.find('.button-icon').exists()).toBe(false)
    wrapper.setProps({ loading: true })
    expect(wrapper.find('.button-icon').exists()).toBe(true)
  })
})
