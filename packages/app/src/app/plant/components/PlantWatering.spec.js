import { shallowMount, createLocalVue } from '@vue/test-utils'
import { DropletIcon } from 'vue-feather-icons'
import VueTouch from 'vue-touch'
import PlantWatering from '@/app/plant/components/PlantWatering'

const localVue = createLocalVue()
localVue.use(VueTouch)

describe('app/plant/PlantWatering.vue', () => {
  const options = {
    localVue,
    stubs: {
      'better-dialog': '<div />',
      'feather-droplet': DropletIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantWatering, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantWatering, options)
    expect(wrapper.props().amount).toEqual(1)
    expect(wrapper.props().frequency).toEqual('weekly')
  })

  it('computed property selectedAmount() works as expected', () => {
    const wrapper = shallowMount(PlantWatering, options)
    expect(wrapper.vm.selectedAmount).toEqual('just a bit')
    wrapper.setProps({ amount: 70 })
    expect(wrapper.vm.selectedAmount).toEqual('a lot')
  })
})
