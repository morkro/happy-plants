import blobUtil from 'blob-util'
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

  before(async () => {
    base64 = await blobUtil.blobToBase64String(blob)
  })

  it('isBase64() works as expected', () => {
    expect(isBase64(base64)).to.equal(true)
    expect(isBase64()).to.equal(false)
  })

  it('isBlobbable() works as expected', () => {
    expect(isBlobbable(blob)).to.equal(true)
    expect(isBlobbable('foo')).to.equal(false)
  })

  it('getUrlFromBlob() works as expected', () => {
    expect(getUrlFromBlob()).to.equal('')
  })

  it('convertToBlob() works as expected', async () => {
    const config = { blob: base64 }
    expect(await convertToBlob(config)).to.deep.equal({
      blob: await blobUtil.base64StringToBlob(config.blob)
    })
    expect(convertToBlob({})).to.deep.equal({})
  })
})
