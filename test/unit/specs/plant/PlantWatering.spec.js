import { shallowMount } from '@vue/test-utils'
import PlantWatering from '@/app/plant/components/PlantWatering'

describe('app/plant/PlantWatering.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantWatering)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantWatering)
    expect(wrapper.props().amount).toEqual(1)
    expect(wrapper.props().frequency).toEqual('weekly')
  })

  it('computed property selectedAmount() works as expected', () => {
    const wrapper = shallowMount(PlantWatering)
    expect(wrapper.vm.selectedAmount).toEqual('just a bit')
    wrapper.setData({ amount: 70 })
    expect(wrapper.vm.selectedAmount).toEqual('a lot')
  })
})
