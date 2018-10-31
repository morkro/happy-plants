function loadImage ($el) {
  const $img = Array.from($el.children).find(el => el.nodeName === 'IMG')
  if ($img) {
    $img.addEventListener('load', () => setTimeout(() => $el.classList.add('loaded'), 100))
    $img.src = $img.dataset.src
  }
}

function createObserver ($el) {
  const options = { root: null, threshold: '0' }
  const observer = new IntersectionObserver(handleObserver, options)
  observer.observe($el)
}

function handleObserver (entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      loadImage(entry.target)
      observer.unobserve(entry.target)
    }
  }
}

export default {
  inserted: $el => {
    if ('IntersectionObserver' in window) {
      createObserver($el)
    } else {
      loadImage($el)
    }
  }
}
