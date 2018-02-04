import { mount } from 'vue-test-utils'
import PlantFooter from '@/app/plant/components/PlantFooter'

describe('app/plant/PlantFooter.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantFooter)
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantFooter)
    expect(typeof wrapper.props().modified).to.equal('number')
    expect(typeof wrapper.props().created).to.equal('number')
    expect(wrapper.props().noModules).to.equal(true)
  })
})
