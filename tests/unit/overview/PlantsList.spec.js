import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PlantsList from '@/app/overview/components/PlantsList'
import store from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('app/overview/PlantsList.vue', () => {
  const options = {
    localVue,
    store,
    propsData: {
      contentLoading: true,
      type: 'grid',
      plants: [],
      tags: [],
      isDeleteMode: false,
      isPressedMode: false
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantsList, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantsList, options)
    expect(wrapper.props().contentLoading).toEqual(true)
    expect(wrapper.props().type).toEqual('grid')
    expect(wrapper.props().plants).toEqual([])
    expect(wrapper.props().isDeleteMode).toEqual(false)
    expect(wrapper.props().isPressedMode).toEqual(false)
  })
})
