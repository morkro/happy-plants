import { shallowMount } from '@vue/test-utils'
import PlantsList from '@/app/overview/components/PlantsList'

describe('app/overview/PlantsList.vue', () => {
  const defaultProps = {
    type: 'grid',
    plants: [],
    tags: [],
    isDeleteMode: false,
    isPressedMode: false
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantsList, { propsData: defaultProps })
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantsList, { propsData: defaultProps })
    expect(wrapper.props().type).toEqual('grid')
    expect(wrapper.props().plants).toEqual([])
    expect(wrapper.props().isDeleteMode).toEqual(false)
    expect(wrapper.props().isPressedMode).toEqual(false)
  })
})
