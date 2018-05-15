import { shallowMount } from '@vue/test-utils'
import PlantNotes from '@/app/plant/components/PlantNotes'

describe('app/plant/PlantNotes.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantNotes)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantNotes)
    expect(wrapper.props().content).toEqual('Add your notes here!')
  })
})
