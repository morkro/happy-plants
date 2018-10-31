import { shallowMount, createLocalVue } from '@vue/test-utils'
import AuthProviderList from '@/components/AuthProviderList'

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
})
