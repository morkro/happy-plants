import { routeConfigMap } from 'routes'
import { RouteLayoutOptions } from 'components/Layout'

export default function useRouteConfig(configName: string): RouteLayoutOptions {
  if (!configName) {
    throw Error(`Route configuration name required, passed "${configName}"`)
  }

  if (routeConfigMap.has(configName)) {
    return routeConfigMap.get(configName) as RouteLayoutOptions
  }

  console.warn(`Route option "${configName}" not found, returning empty`)
  return {}
}
