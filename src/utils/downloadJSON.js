const isObject = obj => typeof obj === 'object' && obj !== null

/**
 * @params {Object} data
 * @params {String} [fileName]
 */
export default function downloadJSON (data = {}, fileName = `happy-plants-${Date.now()}.json`) {
  data = isObject(data) ? JSON.stringify(data, null, 2) : data

  const blob = new Blob([data], { type: 'text/json' })
  const event = new MouseEvent('click', { view: window })
  const $a = document.createElement('a')

  $a.download = fileName
  $a.href = window.URL.createObjectURL(blob)
  $a.dataset.downloadurl = ['text/json', $a.download, $a.href].join(':')

  $a.dispatchEvent(event)
}
