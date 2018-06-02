import { shallowMount } from '@vue/test-utils'
import PlantFooter from '@/app/plant/components/PlantFooter'

describe('app/plant/PlantFooter.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantFooter)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantFooter)
    expect(wrapper.props().noModules).toEqual(true)
    expect(wrapper.props().showTagButton).toEqual(false)
  })
})
