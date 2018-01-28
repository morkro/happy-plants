import blobUtil from 'blob-util'
import hermiteResize from 'workerize-loader!./hermite-resize' // eslint-disable-line

const hermite = hermiteResize()

function hermizeResizeWrapper (canvas, W, H, W2 = W / 2, H2 = H / 2) {
  if (!canvas) return

  let time1 = Date.now()
  let img = canvas.getContext('2d').getImageData(0, 0, W, H)
  let img2 = canvas.getContext('2d').getImageData(0, 0, W2, H2)
  let data = img.data
  let data2 = img2.data

  img2.data = hermite.resize({ data, data2, W, W2, H, H2 })

  console.log('hermite = ' + Math.round(Date.now() - time1) / 1000 + ' s')

  canvas.width = W2
  canvas.height = H2
  canvas.getContext('2d').putImageData(img2, 0, 0)

  return canvas
}

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

      blobUtil.canvasToBlob(hermizeResizeWrapper(canvas, width, height, resizedWidth, resizedHeight))
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
