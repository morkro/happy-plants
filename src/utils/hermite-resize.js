/**
 * Resize algorithm using the Hermite interpolation.
 * Found on StackOverflow and adjusted to my needs:
 * @see https://stackoverflow.com/a/19223362/1724106
 */

export function resize ({ data, data2, W, W2, H, H2 } = {}) {
  let ratioWidth = W / W2
  let ratioHeight = H / H2
  let ratioWidthHalf = Math.ceil(ratioWidth / 2)
  let ratioHeightHalf = Math.ceil(ratioHeight / 2)

  for (let j = 0; j < H2; j++) {
    for (let i = 0; i < W2; i++) {
      let x2 = (i + j * W2) * 4
      let weight = 0
      let weights = 0
      let weightsAlpha = 0
      let gxR = 0
      let gxG = 0
      let gxB = 0
      let gxA = 0
      let centerY = (j + 0.5) * ratioHeight
      for (let yy = Math.floor(j * ratioHeight); yy < (j + 1) * ratioHeight; yy++) {
        let dy = Math.abs(centerY - (yy + 0.5)) / ratioHeightHalf
        let centerX = (i + 0.5) * ratioWidth
        let w0 = dy * dy // pre-calc part of w
        for (let xx = Math.floor(i * ratioWidth); xx < (i + 1) * ratioWidth; xx++) {
          let dx = Math.abs(centerX - (xx + 0.5)) / ratioWidthHalf
          let w = Math.sqrt(w0 + dx * dx)
          if (w >= -1 && w <= 1) {
            // hermite filter
            weight = 2 * w * w * w - 3 * w * w + 1
            if (weight > 0) {
              dx = 4 * (xx + yy * W)
              // alpha
              gxA += weight * data[dx + 3]
              weightsAlpha += weight
              // colors
              if (data[dx + 3] < 255) weight = weight * data[dx + 3] / 250
              gxR += weight * data[dx]
              gxG += weight * data[dx + 1]
              gxB += weight * data[dx + 2]
              weights += weight
            }
          }
        }
      }
      data2[x2] = gxR / weights
      data2[x2 + 1] = gxG / weights
      data2[x2 + 2] = gxB / weights
      data2[x2 + 3] = gxA / weightsAlpha
    }
  }

  return data2
}
