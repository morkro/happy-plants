import { shallowMount } from '@vue/test-utils'
import PlantPreview from '@/app/overview/components/PlantPreview'

describe('app/overview/PlantPreview.vue', () => {
  const defaultProps = {
    type: 'grid',
    deleteMode: false,
    categoriseMode: false,
    pressedMode: false,
    guid: '',
    name: '',
    imageUrl: '',
    defaultSelected: false
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantPreview, { propsData: defaultProps })
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantPreview, { propsData: defaultProps })
    expect(wrapper.props().type).toEqual('grid')
    expect(wrapper.props().deleteMode).toEqual(false)
    expect(wrapper.props().categoriseMode).toEqual(false)
    expect(wrapper.props().pressedMode).toEqual(false)
    expect(wrapper.props().guid).toEqual('')
    expect(wrapper.props().name).toEqual('')
    expect(wrapper.props().imageUrl).toEqual('')
    expect(wrapper.props().defaultSelected).toEqual(false)
  })
})
