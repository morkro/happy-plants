import { mount } from '@vue/test-utils'
import PlantWatering from '@/app/plant/components/PlantWatering'

describe('app/plant/PlantWatering.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantWatering)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantWatering)
    expect(wrapper.props().amount).toEqual(5)
  })

  it('computed property defaultInputProperties() works as expected', () => {
    const wrapper = mount(PlantWatering)
    expect(wrapper.vm.defaultInputProperties).toEqual('--min: 5; --max: 100; --val: 5')
    wrapper.setData({ actualLevel: 70 })
    expect(wrapper.vm.defaultInputProperties).toEqual('--min: 5; --max: 100; --val: 70')
  })
})
