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
})
