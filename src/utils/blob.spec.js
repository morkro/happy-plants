import * as blobUtil from 'blob-util'
import { isBase64, isBlobbable, getUrlFromBlob, convertToBlob } from '@/utils/blob'

/**
 * TODO
 * - hasReaderSupport(): test it
 * - getUrlFromBlob(): figure out how to test returned URL with guid
 * - resizeBlob(): figure out how to test correct output
 */

describe('utils/blob.js', () => {
  const blob = blobUtil.createBlob(['hello world'], { type: 'text/plain' })
  let base64 = null

  beforeAll(async () => {
    base64 = await blobUtil.blobToBase64String(blob)
  })

  it('isBase64() works as expected', () => {
    expect(isBase64(base64)).toEqual(true)
    expect(isBase64()).toEqual(false)
  })

  it('isBlobbable() works as expected', () => {
    expect(isBlobbable(blob)).toEqual(true)
    expect(isBlobbable('foo')).toEqual(false)
  })

  it('getUrlFromBlob() works as expected', () => {
    expect(getUrlFromBlob()).toEqual('')
  })

  it('convertToBlob() works as expected', async () => {
    const config = { blob: base64 }
    expect(await convertToBlob(config)).toEqual({
      blob: await blobUtil.base64StringToBlob(config.blob)
    })
    expect(convertToBlob({})).toEqual({})
  })
})
