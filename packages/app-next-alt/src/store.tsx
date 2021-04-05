import React, { createContext, useContext, useReducer } from 'react'
import { AuthLoaderType } from 'components/AuthLoader'
import { FirebaseUser } from 'typings/firebase'

export interface AppState {
  initializing: boolean
  user: FirebaseUser | null
  isSignedIn: boolean
  authLoader: {
    show: boolean
    message?: AuthLoaderType
  }
}

export const initialStore: AppState = {
  initializing: true,
  user: null,
  isSignedIn: false,
  authLoader: {
    show: false,
    message: undefined,
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
