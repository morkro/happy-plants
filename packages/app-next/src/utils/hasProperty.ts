const hasProperty = (object: Record<string, any>, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, key)

export default hasProperty
