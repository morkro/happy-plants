import { shallowMount } from '@vue/test-utils'
import Tag from '@/components/Tag'

describe('components/Tag.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(Tag)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(Tag)
    expect(wrapper.props().size).toEqual('normal')
  })
})
