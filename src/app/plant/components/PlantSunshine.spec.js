import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueTouch from 'vue-touch'
import PlantSunshine from '@/app/plant/components/PlantSunshine'

const localVue = createLocalVue()
localVue.use(VueTouch)

describe('app/plant/PlantSunshine.vue', () => {
  const options = {
    localVue
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantSunshine, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantSunshine, options)
    expect(wrapper.props().intensity).toEqual(1)
    expect(wrapper.props().messages).toEqual(false)
  })

  // it('emits correct data when clicked', () => {
  //   const wrapper = shallowMount(PlantSunshine, options)
  //   const intensityEl = wrapper.find('.sunshine-canvas .active')
  //
  //   wrapper.setMethods({ onEmitIntensityChange: jest.fn() })
  //   expect(intensityEl.exists()).toBe(true)
  //   intensityEl.trigger('click')
  //   expect(wrapper.emitted('update-plant')).toBeTruthy()
  //   expect(wrapper.vm.onEmitIntensityChange).toHaveBeenCalled()
  // })
})
