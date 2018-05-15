import { shallowMount } from '@vue/test-utils'
import PlantSunshine from '@/app/plant/components/PlantSunshine'

describe('app/plant/PlantSunshine.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantSunshine)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantSunshine)
    expect(wrapper.props().intensity).toEqual(1)
    expect(wrapper.props().messages).toEqual(false)
  })
})
