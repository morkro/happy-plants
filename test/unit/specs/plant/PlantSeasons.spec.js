import { mount } from 'vue-test-utils'
import PlantSeasons from '@/app/plant/components/PlantSeasons'

describe('app/plant/PlantSeasons.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantSeasons)
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantSeasons)
    expect(wrapper.props().seasons).to.deep.equal([])
  })
})
