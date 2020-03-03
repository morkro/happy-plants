import { shallowMount, createLocalVue } from '@vue/test-utils'
import { ImageIcon } from 'vue-feather-icons'
import PlantGallery from '@/app/plant/components/PlantGallery'
import Button from '@/components/Button'

const localVue = createLocalVue()

describe('app/plant/PlantGallery.vue', () => {
  const options = {
    localVue,
    stubs: {
      'v-button': Button,
      'feather-image': ImageIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantGallery, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantGallery, options)
    expect(wrapper.props().gallery).toEqual([])
    expect(wrapper.props().list).toEqual([])
  })
})
