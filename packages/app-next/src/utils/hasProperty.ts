const hasProperty = (object: Record<string, unknown>, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, key)

export default hasProperty
