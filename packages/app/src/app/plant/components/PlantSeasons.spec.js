import { shallowMount, createLocalVue } from '@vue/test-utils'
import { MoonIcon } from 'vue-feather-icons'
import PlantSeasons from '@/app/plant/components/PlantSeasons'

const localVue = createLocalVue()

describe('app/plant/PlantSeasons.vue', () => {
  const options = {
    localVue,
    stubs: {
      'feather-moon': MoonIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantSeasons, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantSeasons, options)
    expect(wrapper.props().seasons).toEqual([])
  })
})
