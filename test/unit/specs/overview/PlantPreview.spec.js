import { mount } from 'vue-test-utils'
import PlantPreview from '@/app/overview/components/PlantPreview'

describe('app/overview/PlantPreview.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantPreview)
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantPreview)
    expect(wrapper.props().deleteMode).to.equal(false)
    expect(wrapper.props().categoriseMode).to.equal(false)
    expect(wrapper.props().name).to.equal('')
    expect(wrapper.props().imageURL).to.equal('')
    expect(wrapper.props().defaultSelected).to.equal(false)
  })
})
