/**
 * Compares two semantic version.
 * @param  {string} ver1 Old version
 * @param  {string} ver2 New version
 * @param  {boolean} ignorePatch
 * @return {boolean}
 * @see https://stackoverflow.com/a/47159772/1724106
 */
export default function compareVersion (ver1, ver2, ignorePatch = true) {
  if (!ver1 || !ver2) return
  const v1parts = ver1.split('.')
  const v2parts = ver2.split('.')
  let v1 = v1parts
  let v2 = v2parts

  if (ignorePatch) {
    v1 = v1parts.splice(0, v1parts.length - 1)
    v2 = v2parts.splice(0, v2parts.length - 1)
  }

  v1 = v1.map(s => s.padStart(10)).join('.')
  v2 = v2.map(s => s.padStart(10)).join('.')

  return v1 < v2
}
