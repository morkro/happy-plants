import React, { createContext, useContext, useReducer } from 'react'
import { User } from 'firebase/auth'
import { AuthLoaderType } from 'components/AuthLoader'
import getAnimationPreference, { AnimationPreferences } from 'utilities/getAnimationPreference'

export interface AppState {
  user: User | null
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
    animations: getAnimationPreference(),
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
