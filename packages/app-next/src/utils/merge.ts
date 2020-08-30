import merge from 'deepmerge'

type CustomOptions = Required<merge.Options> & {
  cloneUnlessOtherwiseSpecified: (item: any, options: CustomOptions) => any
}

// https://github.com/TehShrike/deepmerge#arraymerge-example-combine-arrays
const combineMerge = (target: any[], source: any[], options: CustomOptions): any[] => {
  const destination = target.slice()

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options)
    } else if (target.indexOf(item) === -1) {
      destination.push(item)
    }
  })
  return destination
}

export default function deepMerge(obj1: Partial<unknown>, obj2: Partial<unknown>): unknown {
  return merge(obj1, obj2, {
    arrayMerge: combineMerge,
  })
}
