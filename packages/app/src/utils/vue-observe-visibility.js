import throttle from 'lodash.throttle'

function throwFunctionError (value) {
  if (value !== null && typeof value !== 'function') {
    throw new Error('observe-visibility directive expects a function as value!')
  }
}

function getOffset (modifiers = []) {
  const config = { top: 0, right: 0, bottom: 0, left: 0 }

  Object.keys(config).forEach((el, index) => {
    if (modifiers[index]) {
      config[el] = parseInt(modifiers[index], 10)
    }
  })

  return config
}

function inView (el, options = {}) {
  const { top, right, bottom, left, width, height } = el.getBoundingClientRect()
  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  }
  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height
  }

  return (
    intersection.t > (options.offset.top + threshold.y) &&
    intersection.r > (options.offset.right + threshold.x) &&
    intersection.b > (options.offset.bottom + threshold.y) &&
    intersection.l > (options.offset.left + threshold.x)
  )
}

const observeVisibility = {
  viewListener: () => {},

  bind (el, { value, arg, modifiers }, vnode) {
    throwFunctionError(value)

    const interval = parseInt(arg, 10) || 200
    const options = {
      offset: getOffset(Object.keys(modifiers)),
      threshold: 0
    }

    observeVisibility.viewListener = throttle(() => value(inView(el, options)), interval)

    vnode.context.$nextTick(() => {
      document.addEventListener('scroll', observeVisibility.viewListener)
    })
  },

  update (el, { value }) {
    throwFunctionError(value)
  },

  unbind () {
    document.removeEventListener('scroll', observeVisibility.viewListener)
    observeVisibility.viewListener = () => {}
  }
}

export { observeVisibility }

export default {
  install (Vue) {
    Vue.directive('observe-visibility', observeVisibility)
  }
}
