import { shallowMount, createLocalVue } from '@vue/test-utils'
import AuthProviderList from '@/components/AuthProviderList'
import Button from '@/components/Button'

const localVue = createLocalVue()

describe('components/AuthProviderList.vue', () => {
  const options = {
    localVue
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(AuthProviderList, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(AuthProviderList)
    expect(wrapper.props().loading).toEqual(false)
    expect(wrapper.props().disabled).toEqual(false)
  })

  it(`emit 'provider-selected' works`, () => {
    const wrapper = shallowMount(AuthProviderList)
    const index = 0
    const button = wrapper.findAll(Button).at(index)
    button.trigger('click')
    expect(wrapper.emitted('provider-selected')).toBeTruthy()
    expect(wrapper.emitted('provider-selected'))
      .toEqual([[wrapper.vm.$data.signInOptions[index].key]])
  })
})
