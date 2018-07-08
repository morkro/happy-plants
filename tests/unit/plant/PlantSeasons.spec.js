import { shallowMount } from '@vue/test-utils'
import PlantSeasons from '@/app/plant/components/PlantSeasons'

describe('app/plant/PlantSeasons.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantSeasons)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantSeasons)
    expect(wrapper.props().seasons).toEqual([])
  })
})
