import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { GlobalStyle, theme } from 'theme'
import * as serviceWorkerRegistration from 'serviceWorkerRegistration'
import reportWebVitals from 'reportWebVitals'
import config from 'config'
import { routePaths } from 'routes'
import { AppContextProvider, useAppStore } from 'store'
import logger from 'utilities/logger'
import NotFound from 'pages/NotFound'
import Welcome from 'pages/Welcome'
import Error from 'pages/Error'
import { FirebaseAuthProvider } from 'components/FirebaseAuthProvider'
import SkipLink from 'components/SkipLink'
import Toaster from 'components/Toaster'
import Splash from 'pages/Splash'
import A11yTitleAnnouncer from 'components/A11yTitleAnnouncer'

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

const Login = lazy(() => import('pages/Login' /* webpackChunkName: "unauthorized" */))
const Home = lazy(() => import('pages/Home' /* webpackChunkName: "home" */))
const Watering = lazy(() => import('pages/Watering' /* webpackChunkName: "watering" */))
const Plant = lazy(() => import('pages/Plant' /* webpackChunkName: "plant" */))
const New = lazy(() => import('pages/New' /* webpackChunkName: "new" */))
const Settings = lazy(() => import('pages/Settings' /* webpackChunkName: "settings" */))
const SettingsA11y = lazy(() => import('pages/SettingsA11y' /* webpackChunkName: "settings" */))
const SettingsAbout = lazy(() => import('pages/SettingsAbout' /* webpackChunkName: "settings" */))
const SettingsBugReport = lazy(
  () => import('pages/SettingsBugReport' /* webpackChunkName: "settings" */)
)

function App() {
  const { store } = useAppStore()
  return (
    <React.Fragment>
      <GlobalStyle enableAnimations={store.userPreferences.animations === 'enabled'} />
      <Router>
        <A11yTitleAnnouncer />
        <SkipLink />
        <Toaster />
        <React.Suspense fallback={<Splash />}>
          <Routes>
            <Route
              path={routePaths.root}
              element={store.isSignedIn ? <Navigate to={routePaths.home} /> : <Welcome />}
            />
            <Route path={routePaths.login} element={<Login />} />
            <Route path={routePaths.home} element={<Home />} />
            <Route path={routePaths.watering} element={<Watering />} />
            <Route path={routePaths.plant.base} element={<Plant />} />
            <Route path={routePaths.new} element={<New />} />
            <Route path={routePaths.settings.base} element={<Settings />} />
            <Route path={routePaths.settings.a11y} element={<SettingsA11y />} />
            <Route path={routePaths.settings.about} element={<SettingsAbout />} />
            <Route path={routePaths.settings.bugReport} element={<SettingsBugReport />} />
            <Route path={routePaths.catchAll} element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </Router>
    </React.Fragment>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <FirebaseAuthProvider config={config.api.firebase}>
            <Sentry.ErrorBoundary showDialog={false} fallback={<Error />}>
              <App />
            </Sentry.ErrorBoundary>
          </FirebaseAuthProvider>
        </AppContextProvider>
      </ThemeProvider>
    </HelmetProvider>
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
