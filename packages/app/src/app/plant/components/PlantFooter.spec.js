import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BoxIcon, TagIcon } from 'vue-feather-icons'
import Button from '@/components/Button'
import PlantFooter from '@/app/plant/components/PlantFooter'

describe('app/plant/PlantFooter.vue', async () => {
  const localVue = createLocalVue()
  const options = {
    localVue,
    stubs: {
      'v-button': Button,
      'feather-box': BoxIcon,
      'feather-tag': TagIcon
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

  it('toggles a message if noModules prop is changed', async () => {
    const wrapper = shallowMount(PlantFooter, options)
    expect(wrapper.find('p').exists()).toBe(true)
    wrapper.setProps({ noModules: false })
    await Vue.nextTick()
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('shows the tag button if prop is set', async () => {
    const wrapper = shallowMount(PlantFooter, options)
    let TagButton = wrapper.find('v-button.footer-tags')

    expect(TagButton.exists()).toBe(false)
    wrapper.setProps({ showTagButton: true })
    await Vue.nextTick()

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
