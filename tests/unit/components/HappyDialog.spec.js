import { shallowMount } from '@vue/test-utils'
import HappyDialog from '@/components/HappyDialog'

describe('components/HappyDialog.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(HappyDialog)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(HappyDialog)
    expect(wrapper.props().id).toEqual('happy-dialog')
    expect(wrapper.props().appRoot).toEqual('#app')
    expect(wrapper.props().show).toBe(false)
    expect(wrapper.props().type).toEqual('normal')
  })

  // it('emits events when opened or closed', () => {
  //   const wrapper = shallowMount(HappyDialog)
  //   wrapper.setProps({ show: true })
  //   expect(wrapper.emitted('open-dialog')).toBeTruthy()
  //   wrapper.setProps({ show: false })
  //   expect(wrapper.emitted('close-dialog')).toBeTruthy()
  // })
})
