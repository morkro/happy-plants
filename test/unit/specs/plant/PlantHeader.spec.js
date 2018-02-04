import { mount } from 'vue-test-utils'
import PlantHeader from '@/app/plant/components/PlantHeader'

describe('app/plant/PlantHeader.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantHeader)
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantHeader)
    expect(wrapper.props().name).to.equal(false)
    expect(wrapper.props().imageURL).to.equal(false)
    expect(wrapper.props().editMode).to.equal(false)
  })
})
