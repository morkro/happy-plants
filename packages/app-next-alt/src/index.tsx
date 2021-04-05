import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { GlobalStyle, theme } from 'theme'
import * as serviceWorkerRegistration from 'serviceWorkerRegistration'
import reportWebVitals from 'reportWebVitals'
import config from 'config'
import { publicRoutes, routePaths, privateRoutes } from 'routes'
import { AppContextProvider, useAppStore } from 'store'
import logger from 'utilities/logger'
import NotFound from 'pages/NotFound'
import Welcome from 'pages/Welcome'
import Error from 'pages/Error'
import Loading from 'pages/Loading'
import { FirebaseAuthProvider } from 'components/FirebaseAuthProvider'
import SkipLink from 'components/SkipLink'
import LayoutRoute from 'components/LayoutRoute'
import Toaster from 'components/Toaster'

logger(
  "Hello, fellow developer 👋🏻\nInterested how this app is build? Well, it's open source! Go check it out on https://github.com/morkro/happy-plants 🤙🏼"
)

if (config.isProductionMode) {
  logger('[Application] Running in production mode.')
  Sentry.init({
    dsn: config.api.sentry.dsn,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
} else {
  logger('[Application] Running in development mode.')
}

function App() {
  const { store } = useAppStore()
  return (
    <React.Fragment>
      <SkipLink />
      <Toaster />

      <Router>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={routePaths.root}>
              {store.isSignedIn ? <Redirect to={routePaths.home} /> : <Welcome />}
            </Route>
            {publicRoutes.map((route, index) => (
              <LayoutRoute key={`${route.path} + ${index}`} {...route} />
            ))}
            {privateRoutes.map((route, index) =>
              store.isSignedIn ? (
                <LayoutRoute isPrivateRoute key={`${route.path} + ${index}`} {...route} />
              ) : (
                <Redirect key={'redirect' + index} to={routePaths.login} />
              )
            )}
            <LayoutRoute exact isPrivateRoute path={routePaths.catchAll} component={NotFound} />
          </Switch>
        </React.Suspense>
      </Router>
    </React.Fragment>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <FirebaseAuthProvider config={config.api.firebase}>
          <GlobalStyle />
          <Sentry.ErrorBoundary showDialog={false} fallback={<Error />}>
            <App />
          </Sentry.ErrorBoundary>
        </FirebaseAuthProvider>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
