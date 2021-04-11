import React, { createContext, useContext, useReducer } from 'react'
import config from 'config'
import { AuthLoaderType } from 'components/AuthLoader'
import { FirebaseUser } from 'typings/firebase'
import { getLocalEntry } from 'services/localStorage'

type AnimationPreferences = 'enabled' | 'disabled'

export interface AppState {
  user: FirebaseUser | null
  isSignedIn: boolean
  authLoader: {
    show: boolean
    message?: AuthLoaderType
  }
  userPreferences: {
    animations: null | AnimationPreferences
  }
}

export const initialStore: AppState = {
  user: null,
  isSignedIn: false,
  authLoader: {
    show: false,
    message: undefined,
  },
  userPreferences: {
    animations:
      getLocalEntry(config.session.userAnimationPreference) === null
        ? 'disabled'
        : (getLocalEntry(config.session.userAnimationPreference) as AnimationPreferences),
  },
}

interface AppContextProps {
  store: AppState
  setStore: React.Dispatch<Partial<AppState>>
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

export function AppContextProvider(props: React.PropsWithChildren<{ initialStore?: AppState }>) {
  const [store, setStore] = useReducer(
    (store: AppState, newStore: Partial<AppState>) => ({ ...store, ...newStore }),
    props?.initialStore ? props.initialStore : initialStore
  )

  return <AppContext.Provider value={{ store, setStore }}>{props.children}</AppContext.Provider>
}

export function useAppStore(): AppContextProps {
  return useContext(AppContext)
}
