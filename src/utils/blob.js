import blobUtil from 'blob-util'

export const isBlobbable = blob => (
  blob instanceof Blob ||
  blob instanceof File
)

export function getUrlFromBlob (blob) {
  return isBlobbable(blob)
    ? blobUtil.createObjectURL(blob)
    : ''
}
