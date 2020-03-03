import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BookIcon } from 'vue-feather-icons'
import PlantNotes from '@/app/plant/components/PlantNotes'
import Button from '@/components/Button'

const localVue = createLocalVue()

describe('app/plant/PlantNotes.vue', () => {
  const options = {
    localVue,
    stubs: {
      'v-button': Button,
      'better-dialog': '<div />',
      'feather-book': BookIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(PlantNotes, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(PlantNotes, options)
    expect(wrapper.props().content).toEqual('Add your notes here!')
    expect(wrapper.vm.textContent).toEqual('Add your notes here!')
  })
})
