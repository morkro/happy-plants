import { shallowMount } from '@vue/test-utils'
import PlantPreview from '@/app/overview/components/PlantPreview'

describe('app/overview/PlantPreview.vue', () => {
  const defaultProps = {
    type: 'grid',
    deleteMode: false,
    pressedMode: false,
    guid: '',
    name: '',
    imageUrl: ''
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantPreview, { propsData: defaultProps })
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantPreview, { propsData: defaultProps })
    expect(wrapper.props().type).toEqual('grid')
    expect(wrapper.props().deleteMode).toEqual(false)
    expect(wrapper.props().pressedMode).toEqual(false)
    expect(wrapper.props().guid).toEqual('')
    expect(wrapper.props().name).toEqual('')
    expect(wrapper.props().imageUrl).toEqual('')
  })
})
