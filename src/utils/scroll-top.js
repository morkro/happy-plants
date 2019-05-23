export default function scrollTop () {
  const duration = 222
  const cosParameter = window.scrollY / 2
  let count = 0
  let oldTimestamp = performance.now()

  function step (newTimestamp) {
    count += Math.PI / (duration / (newTimestamp - oldTimestamp))

    if (count >= Math.PI) window.scrollTo(0, 0)
    if (window.scrollY === 0) return

    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(count)))
    oldTimestamp = newTimestamp
    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}
