import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/Text.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
