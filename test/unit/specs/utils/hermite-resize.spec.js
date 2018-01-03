import hermiteResize from '@/utils/hermite-resize'

/**
 * TODO
 * - Test actual resizing output
 */

describe('utils/hermite-resize.js', () => {
  it('should return undefined without parameters', () => {
    expect(hermiteResize()).to.equal(undefined)
  })
})
