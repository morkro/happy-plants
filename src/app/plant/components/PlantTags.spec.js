import { shallowMount, createLocalVue } from '@vue/test-utils'
import PlantTags from '@/app/plant/components/PlantTags'
import Tag from '@/components/Tag'
import Button from '@/components/Button'

const localVue = createLocalVue()

describe('app/plant/PlantTags.vue', () => {
  const options = {
    localVue,
    stubs: {
      'v-tag': Tag,
      'v-button': Button,
      'feather-plus': '<svg />',
      'feather-x': '<svg />',
      'feather-check': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantTags, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantTags, options)
    expect(wrapper.props().tags).toEqual([])
  })

  it('hide button is visible and works', () => {
    const wrapper = shallowMount(PlantTags, options)
    const hideButton = wrapper.find('.hide-module')
    expect(hideButton.exists()).toBe(true)
    hideButton.trigger('click')
    expect(wrapper.emitted('hide-module')).toBeTruthy()
  })

  it('toggle tag works', () => {
    const wrapper = shallowMount(PlantTags, options)
    const addTagButton = wrapper.find('.tags-add')
    let inputField = wrapper.find('.tags-new')

    expect(addTagButton.exists()).toBe(true)
    expect(inputField.exists()).toBe(false)
    expect(wrapper.vm.showInput).toBe(false)

    addTagButton.trigger('click')
    inputField = wrapper.find('.tags-new')
    expect(inputField.exists()).toBe(true)
    expect(wrapper.vm.showInput).toBe(true)
  })

  it('adding a tag works', () => {
    const wrapper = shallowMount(PlantTags, options)
    wrapper.setData({ showInput: true })

    const input = wrapper.find({ ref: 'tagInput' })
    const button = wrapper.find('.tags-new-button')

    // Add tag name and trigger change
    input.element.value = 'foo'
    input.trigger('change')
    expect(wrapper.vm.newTagName).toEqual('foo')

    // Click submit button
    button.trigger('click')
    expect(wrapper.emitted('new-tag')).toBeTruthy()
    expect(wrapper.emitted('new-tag')).toEqual([[{ label: 'foo' }]])
  })

  it(`adding empty tag won’t emit`, () => {
    const wrapper = shallowMount(PlantTags, options)
    wrapper.setData({ showInput: true })

    const input = wrapper.find({ ref: 'tagInput' })
    const form = wrapper.find('.tags-new')

    input.element.value = ''
    input.trigger('change')
    form.trigger('submit')
    expect(wrapper.emitted('new-tag')).toBeUndefined()
  })
})
