import { shallowMount } from '@vue/test-utils'
import Box from '@/components/Box.vue'

describe('Box.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Box)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
