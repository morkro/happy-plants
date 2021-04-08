import * as blobUtil from 'blob-util'
import hermiteResize from './hermiteResize'

export const isBase64 = (string?: string): boolean => {
  try {
    return btoa(atob(String(string))) === string
  } catch {
    return false
  }
}

export const hasReaderSupport = typeof FileReader !== 'undefined' || typeof URL !== 'undefined'

export const isBlobbable = (blob: unknown): boolean => blob instanceof Blob || blob instanceof File

export function getUrlFromBlob(blob?: Blob): string {
  return isBlobbable(blob) ? blobUtil.createObjectURL(blob!) : ''
}

interface ResizeBlobOptions {
  width?: number
}

export function resizeBlob(file: File, options: ResizeBlobOptions = {}): Promise<Blob> {
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
      const resizedHeight = Math.ceil((height * resizedWidth) / width)

      canvas.width = width
      canvas.height = height

      ctx?.drawImage(img, 0, 0)

      blobUtil
        .canvasToBlob(hermiteResize(canvas, width, height, resizedWidth, resizedHeight))
        .then((blob: Blob) => {
          blobUtil.revokeObjectURL(img.src)
          resolve(blob)
        })
        .catch((error: Error) => {
          blobUtil.revokeObjectURL(img.src)
          reject(error)
        })
    }
  })
}
