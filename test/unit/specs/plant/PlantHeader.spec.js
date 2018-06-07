import { mount } from '@vue/test-utils'
import PlantHeader from '@/app/plant/components/PlantHeader'

describe('app/plant/PlantHeader.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantHeader)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantHeader)
    expect(wrapper.props().name).toEqual(false)
    expect(wrapper.props().imageUrl).toEqual(false)
  })
})
