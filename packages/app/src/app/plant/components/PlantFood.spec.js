import { shallowMount, createLocalVue } from '@vue/test-utils'
import { DropletIcon } from 'vue-feather-icons'
import VueTouch from 'vue-touch'
import PlantFood from '@/app/plant/components/PlantFood'

const localVue = createLocalVue()
localVue.use(VueTouch)

describe('app/plant/PlantFood.vue', () => {
  const options = {
    localVue,
    stubs: {
      'better-dialog': '<div />',
      'feather-droplet': DropletIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantFood, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantFood, options)
    expect(wrapper.props().amount).toEqual(1)
    expect(wrapper.props().frequency).toEqual('monthly')
  })

  it('computed property selectedAmount() works as expected', () => {
    const wrapper = shallowMount(PlantFood, options)
    expect(wrapper.vm.selectedAmount).toEqual('just a bit')
    wrapper.setProps({ amount: 70 })
    expect(wrapper.vm.selectedAmount).toEqual('a lot')
  })
})
