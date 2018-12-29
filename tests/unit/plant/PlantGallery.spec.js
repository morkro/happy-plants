import { shallowMount } from '@vue/test-utils'
import PlantGallery from '@/app/plant/components/PlantGallery'

describe('app/plant/PlantGallery.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantGallery)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantGallery)
    expect(wrapper.props().gallery).toEqual([])
    expect(wrapper.props().list).toEqual([])
  })
})
