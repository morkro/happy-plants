import { mount, createLocalVue } from '@vue/test-utils'
import PlantHeader from '@/app/plant/components/PlantHeader'
import VueTouch from 'vue-touch'
import VueSVGIcon from 'vue-svgicon'

const localVue = createLocalVue()
localVue.use(VueTouch)
localVue.use(VueSVGIcon)

describe('app/plant/PlantHeader.vue', () => {
  const options = {
    localVue
  }

  it('is a Vue component', () => {
    const wrapper = mount(PlantHeader, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(PlantHeader, options)
    expect(wrapper.props().name).toEqual(false)
    expect(wrapper.props().imageUrl).toEqual(false)
  })
})
