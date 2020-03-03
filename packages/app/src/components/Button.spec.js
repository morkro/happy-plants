import { shallowMount, createLocalVue } from '@vue/test-utils'
import { LoaderIcon } from 'vue-feather-icons'
import Button from '@/components/Button'

const localVue = createLocalVue()

describe('components/Button.vue', () => {
  const options = {
    localVue,
    stubs: {
      'feather-loader': LoaderIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Button, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(Button, options)
    expect(wrapper.props().loading).toBe(false)
    expect(wrapper.props().color).toEqual('default')
    expect(wrapper.props().type).toEqual('normal')
  })

  it('adds correct classes depending on props', () => {
    const wrapper = shallowMount(Button, { ...options, propsData: { type: ['small'] } })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['small']))
    wrapper.setProps({ type: ['normal', 'circle'] })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['normal', 'circle']))
  })

  it('renders a loading icon on prop change', () => {
    const wrapper = shallowMount(Button, options)
    expect(wrapper.find('.button-icon').exists()).toBe(false)
    wrapper.setProps({ loading: true })
    expect(wrapper.props().loading).toBe(true)
    expect(wrapper.find('.button-icon').exists()).toBe(true)
  })
})
