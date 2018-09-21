import { shallowMount, createLocalVue } from '@vue/test-utils'
import PlantComponent from '@/app/plant/components/PlantComponent'

const localVue = createLocalVue()

describe('app/plant/PlantComponent.vue', () => {
  const options = {
    localVue
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantComponent, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantComponent, options)
    expect(wrapper.props().settings).toEqual(false)
  })

  it('toggles settings button correctly', (done) => {
    const wrapper = shallowMount(PlantComponent, options)
    expect(wrapper.find('.component-settings').exists()).toBe(false)
    wrapper.setProps({ settings: true })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.component-settings').exists()).toBe(true)
      done()
    })
  })
})
