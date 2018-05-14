import { mount } from '@vue/test-utils'
import PlantPreview from '@/app/overview/components/PlantPreview'

describe('app/overview/PlantPreview.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantPreview)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantPreview)
    expect(wrapper.props().deleteMode).toEqual(false)
    expect(wrapper.props().categoriseMode).toEqual(false)
    expect(wrapper.props().guid).toEqual('')
    expect(wrapper.props().name).toEqual('')
    expect(wrapper.props().imageUrl).toEqual('')
    expect(wrapper.props().defaultSelected).toEqual(false)
  })
})
