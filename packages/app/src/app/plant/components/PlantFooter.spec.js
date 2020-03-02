import { shallowMount, createLocalVue } from '@vue/test-utils'
import Button from '@/components/Button'
import PlantFooter from '@/app/plant/components/PlantFooter'

const localVue = createLocalVue()

describe('app/plant/PlantFooter.vue', () => {
  const options = {
    localVue,
    stubs: {
      'v-button': Button,
      'feather-box': '<svg />',
      'feather-tag': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantFooter, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantFooter, options)
    expect(wrapper.props().noModules).toEqual(true)
    expect(wrapper.props().showTagButton).toEqual(false)
  })

  it('toggles a message if noModules prop is changed', () => {
    const wrapper = shallowMount(PlantFooter, options)
    expect(wrapper.find('p').exists()).toBe(true)
    wrapper.setProps({ noModules: false })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('shows the tag button if prop is set', () => {
    const wrapper = shallowMount(PlantFooter, options)
    let TagButton = wrapper.find('v-button.footer-tags')

    expect(TagButton.exists()).toBe(false)
    wrapper.setProps({ showTagButton: true })

    TagButton = wrapper.find('.footer-tags')
    expect(TagButton.exists()).toBe(true)
    expect(TagButton.is(Button)).toBe(true)
  })

  it('emits event when tag button is tapped', () => {
    const wrapper = shallowMount(PlantFooter, { ...options, propsData: { showTagButton: true } })
    const TagButton = wrapper.find('.footer-tags')
    expect(TagButton.exists()).toBe(true)
    TagButton.trigger('click')
    expect(wrapper.emitted('show-tags')).toBeTruthy()
  })

  it('emits event when modules button is tapped', () => {
    const wrapper = shallowMount(PlantFooter, options)
    const ModulesButton = wrapper.find('.footer-modules')
    expect(ModulesButton.exists()).toBe(true)
    ModulesButton.trigger('click')
    expect(wrapper.emitted('manage-modules')).toBeTruthy()
  })
})
