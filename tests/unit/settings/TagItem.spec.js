import { shallowMount } from '@vue/test-utils'
import TagItem from '@/app/settings/components/TagItem'
import Tag from '@/components/Tag'

describe('app/settings/TagItem.vue', () => {
  const options = {
    propsData: {
      label: 'Foo'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(TagItem, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('renders the Tag component', () => {
    const wrapper = shallowMount(TagItem, options)
    expect(wrapper.find(Tag).exists()).toBe(true)
  })
})
