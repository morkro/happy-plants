import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader'

/**
 * TODO:
 * - Test the slots
 * - Test backPath click with vue-router
 * - Test settings button
 */

describe('components/AppHeader.vue', () => {
  const options = {}

  it('is a Vue component', () => {
    const wrapper = mount(AppHeader, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(AppHeader, options)
    expect(wrapper.props().backPath).toEqual('/')
    expect(wrapper.props().backButton).toEqual(false)
    expect(wrapper.props().settings).toEqual(false)
    expect(wrapper.props().color).toEqual('black')
  })

  it('isWhite() works as expected', () => {
    const wrapper = mount(AppHeader, options)
    expect(typeof wrapper.vm.isWhite).toEqual('function')
    expect(wrapper.vm.isWhite('foo')).toEqual(false)
    expect(wrapper.vm.isWhite('white')).toEqual(true)
  })
})
