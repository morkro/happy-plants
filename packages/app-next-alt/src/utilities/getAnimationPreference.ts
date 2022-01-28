import config from 'config'
import { getLocalEntry } from 'services/webStorage'

export type AnimationPreferences = 'enabled' | 'disabled'

export default function getAnimationPreference(): AnimationPreferences {
  const settingOS: AnimationPreferences = window?.matchMedia('(prefers-reduced-motion: reduce)')
    .matches
    ? 'disabled'
    : 'enabled'
  const userPreference = getLocalEntry(
    config.localStorage.userAnimationPreference
  ) as null | AnimationPreferences

  /** If the user has not set their prefences, we default to the operating systems settings. */
  return userPreference === null ? settingOS : userPreference
}
