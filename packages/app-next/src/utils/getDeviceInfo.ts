// Code taken from https://jsfiddle.net/kmturley/Gd6c8/

export interface DeviceInfo {
  os: {
    name: string
    version: number
  }
  browser: {
    name: string
    version: number
    resolution: string
  }
  device: string
  navigator: {
    userAgent: string
  }
}

const osMap = [
  { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
  { name: 'Windows', value: 'Win', version: 'NT' },
  { name: 'iPhone', value: 'iPhone', version: 'OS' },
  { name: 'iPad', value: 'iPad', version: 'OS' },
  { name: 'Kindle', value: 'Silk', version: 'Silk' },
  { name: 'Android', value: 'Android', version: 'Android' },
  { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
  { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
  { name: 'Macintosh', value: 'Mac', version: 'OS X' },
  { name: 'Linux', value: 'Linux', version: 'rv' },
  { name: 'Palm', value: 'Palm', version: 'PalmOS' },
]

const browserMap = [
  { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
  { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
  { name: 'Safari', value: 'Safari', version: 'Version' },
  { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
  { name: 'Opera', value: 'Opera', version: 'Opera' },
  { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
  { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' },
]

function match(agents: string, map: Record<string, string>[]) {
  let regex, regexv, match, matches, version

  for (let i = 0; i < map.length; i += 1) {
    regex = new RegExp(map[i].value, 'i')
    match = regex.test(agents)

    if (match) {
      regexv = new RegExp(map[i].version + '[- /:;]([\\d._]+)', 'i')
      matches = agents.match(regexv)
      version = ''
      if (matches) {
        if (matches[1]) {
          matches = matches[1]
        }

        matches = (matches as string).split(/[._]+/)
        for (let j = 0; j < matches.length; j += 1) {
          if (j === 0) {
            version += matches[j] + '.'
          } else {
            version += matches[j]
          }
        }
      } else {
        version = '0'
      }

      return {
        name: map[i].name,
        version: parseFloat(version),
      }
    }
  }

  return { name: 'unknown', version: 0 }
}

export function getDeviceInfo(): DeviceInfo {
  const agents = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor,
    (window as any).opera,
  ].join(' ')

  return {
    os: match(agents, osMap),
    browser: {
      ...match(agents, browserMap),
      resolution: `${window.innerWidth}x${window.innerHeight}`,
    },
    device: /Mobi/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
    navigator: {
      userAgent: navigator.userAgent,
    },
  }
}
