import { shallowMount } from '@vue/test-utils'
import Alert from '@/components/Alert'

/**
 * TODO:
 * - Test the slots
 * - Test watcher
 */

describe('components/Alert.vue', () => {
  it('is a Vue component', () => {
    const wrapper = shallowMount(Alert)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(Alert)
    expect(wrapper.props().show).toBe(false)
    expect(wrapper.props().close).toBe(false)
    expect(wrapper.props().backgroundColor).toBe(false)
    expect(wrapper.props().type).toBe('normal')
  })

  it(`is an empty element when 'show' props is false`, () => {
    const wrapper = shallowMount(Alert)
    expect(wrapper.isEmpty()).toBe(true)
  })

  it('sets correct type class', () => {
    const wrapper = shallowMount(Alert, { propsData: { show: true } })
    expect(wrapper.find('.alert-normal').exists()).toBe(true)

    wrapper.setProps({ show: true, type: 'super-type' })
    expect(wrapper.find('.alert-super-type').exists()).toBe(true)
  })

  it(`emits event when calling 'emitAlertClose' method`, () => {
    const wrapper = shallowMount(Alert)
    wrapper.vm.emitAlertClose()

    expect(wrapper.emitted('close-alert')).toEqual([[]])
    expect(wrapper.emitted('close-alert')).toHaveLength(1)
  })

  it(`click on wrapper should call 'emitAlertClose'`, () => {
    const emitAlertClose = jest.fn()
    const wrapper = shallowMount(Alert, {
      propsData: { show: true },
      methods: { emitAlertClose }
    })
    wrapper.trigger('click')
    expect(emitAlertClose).toHaveBeenCalled()
  })

  it(`close button should be rendered and call 'emitAlertClose'`, () => {
    const emitAlertClose = jest.fn()
    const wrapper = shallowMount(Alert, {
      propsData: { show: true, close: true },
      methods: { emitAlertClose }
    })

    const button = wrapper.find('.alert-header button')
    expect(button.exists()).toBe(true)

    button.trigger('click')
    expect(emitAlertClose).toHaveBeenCalled()
  })
})
