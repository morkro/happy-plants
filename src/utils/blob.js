import blobUtil from 'blob-util'
import hermitResize from './hermiteResize'

export const isBase64 = string => {
  try {
    return btoa(atob(string)) === string
  } catch (err) {
    return false
  }
}

export const hasReaderSupport = (
  typeof FileReader !== 'undefined' ||
  typeof URL !== 'undefined'
)

export const isBlobbable = blob => (
  blob instanceof Blob ||
  blob instanceof File
)

export function getUrlFromBlob (blob) {
  return isBlobbable(blob)
    ? blobUtil.createObjectURL(blob)
    : blob.src
      ? blob.src
      : ''
}

export function convertToBlob (config) {
  if (isBlobbable(config.blob) || !isBase64(config.blob)) {
    return config
  }

  return blobUtil.base64StringToBlob(config.blob)
    .then(blob => Object.assign({}, config, { blob }))
}

export function resizeBlob (file, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isBlobbable(file) && !hasReaderSupport) {
      reject(new Error('File is not a blob'))
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.src = blobUtil.createObjectURL(file)
    img.onload = () => {
      const width = img.width
      const height = img.height
      const resizedWidth = options.width ? Math.ceil(options.width) : width / 2
      const resizedHeight = Math.ceil(height * resizedWidth / width)

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, 0, 0)

      blobUtil.canvasToBlob(hermitResize(canvas, width, height, resizedWidth, resizedHeight))
        .then(blob => {
          blobUtil.revokeObjectURL(img.src)
          resolve(blob)
        })
        .catch(error => {
          blobUtil.revokeObjectURL(img.src)
          reject(error)
        })
    }
  })
}
