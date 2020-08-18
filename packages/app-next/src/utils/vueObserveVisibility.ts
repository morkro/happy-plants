import throttle from 'lodash.throttle'
import { VueConstructor, VNode } from 'vue'

function throwFunctionError(value: unknown) {
  if (value !== null && typeof value !== 'function') {
    throw new Error('observe-visibility directive expects a function as value!')
  }
}

function getOffset(modifiers: string[] = []): Record<string, number> {
  const config: Record<string, number> = { top: 0, right: 0, bottom: 0, left: 0 }

  Object.keys(config).forEach((el, index) => {
    if (modifiers[index]) {
      config[el] = parseInt(modifiers[index], 10)
    }
  })

  return config
}

interface InViewOptions {
  offset: Record<string, number>
  threshold: number
}

function inView(el: HTMLElement, options: InViewOptions) {
  const { top, right, bottom, left, width, height } = el.getBoundingClientRect()
  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right,
  }
  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height,
  }

  return (
    intersection.t > options.offset.top + threshold.y &&
    intersection.r > options.offset.right + threshold.x &&
    intersection.b > options.offset.bottom + threshold.y &&
    intersection.l > options.offset.left + threshold.x
  )
}

const observeVisibility = {
  viewListener: () => {}, // eslint-disable-line

  bind(
    el: HTMLElement,
    { value, arg, modifiers }: { value?: any; arg?: string; modifiers: { [key: string]: boolean } },
    vnode: VNode
  ) {
    throwFunctionError(value)

    const interval = parseInt(arg, 10) || 200
    const options = {
      offset: getOffset(Object.keys(modifiers)),
      threshold: 0,
    }

    observeVisibility.viewListener = throttle(() => value(inView(el, options)), interval)

    vnode.context.$nextTick(() => {
      document.addEventListener('scroll', observeVisibility.viewListener)
    })
  },

  update(el: HTMLElement, { value }: { value?: unknown }) {
    throwFunctionError(value)
  },

  unbind() {
    document.removeEventListener('scroll', observeVisibility.viewListener)
    observeVisibility.viewListener = () => {} // eslint-disable-line
  },
}

export { observeVisibility }

export default {
  install(Vue: VueConstructor) {
    Vue.directive('observe-visibility', observeVisibility)
  },
}
