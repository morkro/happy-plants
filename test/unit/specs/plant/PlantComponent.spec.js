import { mount } from '@vue/test-utils'
import PlantComponent from '@/app/plant/components/PlantComponent'

describe('app/plant/PlantComponent.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantComponent)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantComponent)
    expect(wrapper.props().settings).toEqual(false)
  })
})
