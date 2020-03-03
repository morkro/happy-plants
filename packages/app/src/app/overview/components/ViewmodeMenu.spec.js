import { shallowMount, createLocalVue } from '@vue/test-utils'
import {
  GridIcon,
  ListIcon,
  LayersIcon,
  HashIcon,
  BoldIcon,
  ClockIcon
} from 'vue-feather-icons'
import VueTouch from 'vue-touch'
import ViewmodeMenu from '@/app/overview/components/ViewmodeMenu'

const localVue = createLocalVue()
localVue.use(VueTouch)

describe('app/overview/ViewmodeMenu.vue', () => {
  const options = {
    localVue,
    stubs: {
      'feather-grid': GridIcon,
      'feather-list': ListIcon,
      'feather-layers': LayersIcon,
      'feather-hash': HashIcon,
      'feather-bold': BoldIcon,
      'feather-clock': ClockIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(ViewmodeMenu, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('isCheckedTag()', () => {
    const wrapper = shallowMount(ViewmodeMenu, options)
    expect(wrapper.vm.isCheckedTag('0')).toBe(false)
  })

  it('emitViewmodeUpdate()', () => {
    const wrapper = shallowMount(ViewmodeMenu, {
      ...options,
      propsData: {
        tags: [{ name: 'foo' }, { name: 'bar' }]
      }
    })
    const input = wrapper.find('#show-all')
    input.trigger('change')
    expect(wrapper.emitted('update-mode')).toBeTruthy()
    expect(wrapper.emitted('update-mode')).toEqual([[{
      section: 'filterBy',
      type: 'all'
    }]])
  })
})
