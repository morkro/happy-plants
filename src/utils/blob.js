import blobUtil from 'blob-util'
import loadImage from 'blueimp-load-image/js'

export const isBase64 = string => {
  try {
    return btoa(atob(string)) === string
  } catch (err) {
    return false
  }
}

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

export function fixRotation (data) {
  if (!isBlobbable(data.blob)) return
  return new Promise((resolve, reject) => {
    const config = {
      canvas: true,
      orientation: 1
    }
    loadImage(
      data.blob,
      canvas => {
        if (canvas.type === 'error') reject()
        canvas.toBlob(blob => resolve({ ...data, blob }))
      },
      config
    )
  })
}
