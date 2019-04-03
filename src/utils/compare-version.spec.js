import compareVersion from '@/utils/compare-version'

describe('utils/compare-version.js', () => {
  it('compareVersion() return undefined if nothing is passed', () => {
    expect(compareVersion()).toEqual(undefined)
  })

  it('compareVersion() works as expected', () => {
    expect(compareVersion('1.1.0', '1.2.0')).toBe(true)
    expect(compareVersion('1.1.5', '1.2.0')).toBe(true)
    expect(compareVersion('1.3.0', '1.2.0')).toBe(false)
    expect(compareVersion('1.1.0', '1.1.1')).toBe(false)
  })

  it('compareVersion() 3rd option', () => {
    expect(compareVersion('1.1.0', '1.1.1', false)).toBe(true)
    expect(compareVersion('1.1.0', '1.1.0', false)).toBe(false)
  })
})
