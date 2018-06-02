import { shallowMount } from '@vue/test-utils'
import PlantTags from '@/app/plant/components/PlantTags'

describe('app/plant/PlantTags.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantTags)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantTags)
    expect(wrapper.props().tags).toEqual([])
  })
})
