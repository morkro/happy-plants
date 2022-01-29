import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { routePaths } from 'routes'
import { useAppStore } from 'store'

export default function AuthRoute({ children }: { children: JSX.Element }) {
  const { store } = useAppStore()
  const location = useLocation()

  if (!store.isSignedIn) {
    return <Navigate to={routePaths.login} state={{ from: location }} replace />
  }

  return children
}
