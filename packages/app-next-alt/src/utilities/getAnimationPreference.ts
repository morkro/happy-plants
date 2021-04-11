import config from 'config'
import { getLocalEntry } from 'services/localStorage'

export type AnimationPreferences = 'enabled' | 'disabled'

export default function getAnimationPreference(): AnimationPreferences {
  const settingOS: AnimationPreferences = window?.matchMedia('(prefers-reduced-motion: reduce)')
    .matches
    ? 'enabled'
    : 'disabled'
  const userPreference = getLocalEntry(
    config.session.userAnimationPreference
  ) as null | AnimationPreferences

  /** If the user has not set their prefences, we default to the operating systems settings. */
  return userPreference === null ? settingOS : userPreference
}
