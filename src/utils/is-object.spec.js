import isEmptyObject from '@/utils/is-object'

/**
 * TODO
 * - Test actual resizing output
 */

describe('utils/is-object.js', () => {
  it('should check if an object is empty', () => {
    expect(isEmptyObject({})).toEqual(true)
  })
})
