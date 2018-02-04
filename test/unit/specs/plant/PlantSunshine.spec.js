import { mount } from 'vue-test-utils'
import PlantSunshine from '@/app/plant/components/PlantSunshine'

describe('app/plant/PlantSunshine.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantSunshine)
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantSunshine)
    expect(wrapper.props().intensity).to.equal(1)
    expect(wrapper.props().messages).to.equal(false)
  })
})
