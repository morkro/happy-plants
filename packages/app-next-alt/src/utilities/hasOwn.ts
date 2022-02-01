/**
 * `Object.hasOwn()` is currently supported by all major browsers including Node.js
 * However, TypeScript still doesn't support it.
 * @see https://github.com/microsoft/TypeScript/issues/44253
 */

export default function hasOwn(object: unknown, key: string) {
  return Object.prototype.hasOwnProperty.call(object, key)
}
