import { mount } from '@vue/test-utils'
import PlantComponent from '@/app/plant/components/PlantComponent'

describe('app/plant/PlantComponent.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(PlantComponent)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantComponent)
    expect(wrapper.props().settings).toEqual(false)
  })

  it('toggles settings button correctly', (done) => {
    const wrapper = mount(PlantComponent)
    expect(wrapper.find('.component-settings').exists()).toBe(false)
    wrapper.setProps({ settings: true })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.component-settings').exists()).toBe(true)
      done()
    })
  })
})
