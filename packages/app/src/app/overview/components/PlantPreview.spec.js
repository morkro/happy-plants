import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueSVGIcon from 'vue-svgicon'
import VueTouch from 'vue-touch'
import PlantPreview from '@/app/overview/components/PlantPreview'

const localVue = createLocalVue()
localVue.use(VueSVGIcon)
localVue.use(VueTouch)

describe('app/overview/PlantPreview.vue', () => {
  const options = {
    localVue,
    propsData: {
      type: 'grid',
      deleteMode: false,
      pressedMode: false,
      guid: '',
      name: '',
      imageUrl: ''
    },
    stubs: {
      'feather-trash': '<svg />',
      'feather-plus': '<svg />',
      'feather-circle': '<svg />',
      'feather-check': '<svg />',
      'feather-tag': '<svg />',
      'feather-image': '<svg />',
      'feather-loader': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantPreview, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantPreview, options)
    expect(wrapper.props().type).toEqual('grid')
    expect(wrapper.props().deleteMode).toEqual(false)
    expect(wrapper.props().pressedMode).toEqual(false)
    expect(wrapper.props().guid).toEqual('')
    expect(wrapper.props().name).toEqual('')
    expect(wrapper.props().imageUrl).toEqual('')
  })

  it('has correct state when deleteMode is active', () => {
    const wrapper = shallowMount(PlantPreview, options)
    expect(wrapper.vm.ariaLabel).toEqual('')
    wrapper.setProps({ deleteMode: true })
    expect(wrapper.vm.ariaLabel).toEqual('Delete')
    expect(wrapper.vm.frozen).toBe(true)
  })
})
