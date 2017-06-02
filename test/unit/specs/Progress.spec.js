import Progress from '@/components/Progress'
import { getElement } from './helpers'

describe('Progress', () => {
  it('sets the correct default data', () => {
    const $component = getElement(Progress)
    const $progress = $component.childNodes[0]
    const $span = $component.childNodes[1]
    console.log($component, $progress)

    expect($progress.value).toEqual('0')
    expect($progress.max).toEqual('0')
    expect($span.dataset.current).toEqual('0')
    expect($span.dataset.steps).toEqual('0')
  })
})
