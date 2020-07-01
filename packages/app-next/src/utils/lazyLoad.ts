function loadImage($el: Element) {
  const $img = Array.from($el.children).find(el => el.nodeName === 'IMG') as HTMLImageElement
  if ($img) {
    $img.addEventListener('load', () => setTimeout(() => $el.classList.add('loaded'), 100))
    $img.src = $img.dataset.src
  }
}

function handleObserver(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      loadImage(entry.target)
      observer.unobserve(entry.target)
    }
  }
}

function createObserver($el: Element) {
  const observer = new IntersectionObserver(handleObserver, { root: null, threshold: 0 })
  observer.observe($el)
}

export default {
  inserted: ($el: Element) => {
    if ('IntersectionObserver' in window) {
      createObserver($el)
    } else {
      loadImage($el)
    }
  },
}
