import React, { lazy, useEffect } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import * as serviceWorkerRegistration from 'serviceWorkerRegistration'
import reportWebVitals from 'reportWebVitals'
import { GlobalStyle, theme } from 'theme'
import config from 'config'
import { routePaths } from 'routes'
import { AppContextProvider, useAppStore } from 'store'
import NotFound from 'pages/NotFound'
import Welcome from 'pages/Welcome'
import Error from 'pages/Error'
import Splash from 'pages/Splash'
import { FirebaseAuthProvider } from 'components/FirebaseAuthProvider'
import SkipLink from 'components/SkipLink'
import Toaster, { toast } from 'components/Toaster'
import A11yTitleAnnouncer from 'components/A11yTitleAnnouncer'
import AuthRoute from 'components/AuthRoute'
import logger from 'utilities/logger'
import useMediaQuery from 'utilities/useMediaQuery'
import DesktopExplainer from 'components/DesktopExplainer'
import useOfflineEvent from 'utilities/useOfflineEvent'

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

const Onboarding = lazy(() => import('pages/Onboarding' /* webpackChunkName: "unauthorized" */))
const OnboardingHowTo = lazy(
  () => import('pages/OnboardingHowTo' /* webpackChunkName: "unauthorized" */)
)
const OnboardingAccount = lazy(
  () => import('pages/OnboardingAccount' /* webpackChunkName: "unauthorized" */)
)
const OnboardingFinished = lazy(
  () => import('pages/OnboardingFinished' /* webpackChunkName: "unauthorized" */)
)
const Login = lazy(() => import('pages/Login' /* webpackChunkName: "unauthorized" */))
const Home = lazy(() => import('pages/Home' /* webpackChunkName: "home" */))
const Watering = lazy(() => import('pages/Watering' /* webpackChunkName: "watering" */))
const Plant = lazy(() => import('pages/Plant' /* webpackChunkName: "plant" */))
const PlantGallery = lazy(() => import('pages/PlantGallery' /* webpackChunkName: "plant" */))
const PlantNew = lazy(() => import('pages/PlantNew' /* webpackChunkName: "plant" */))
const Settings = lazy(() => import('pages/Settings' /* webpackChunkName: "settings" */))
const SettingsTags = lazy(() => import('pages/SettingsTags' /* webpackChunkName: "settings" */))
const SettingsModules = lazy(
  () => import('pages/SettingsModules' /* webpackChunkName: "settings" */)
)
const SettingsA11y = lazy(() => import('pages/SettingsA11y' /* webpackChunkName: "settings" */))
const SettingsPassword = lazy(
  () => import('pages/SettingsPassword' /* webpackChunkName: "settings" */)
)
const SettingsAbout = lazy(() => import('pages/SettingsAbout' /* webpackChunkName: "settings" */))
const SettingsReleaseNotes = lazy(
  () => import('pages/SettingsReleaseNotes' /* webpackChunkName: "settings" */)
)
const SettingsBugReport = lazy(
  () => import('pages/SettingsBugReport' /* webpackChunkName: "settings" */)
)

function App() {
  const { store } = useAppStore()
  const isDesktop = useMediaQuery('screen and (min-width: 650px)')
  const isOffline = useOfflineEvent()

  useEffect(() => {
    if (isOffline) {
      toast.error('Internet connection lost.')
    }
  }, [isOffline])

  return (
    <React.Fragment>
      <GlobalStyle enableAnimations={store.userPreferences.animations === 'enabled'} />
      {isDesktop && createPortal(<DesktopExplainer />, document.body)}
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
            <Route path={routePaths.onboarding.base} element={<Onboarding />}>
              <Route path={routePaths.onboarding.howTo} element={<OnboardingHowTo />} />
              <Route path={routePaths.onboarding.account} element={<OnboardingAccount />} />
            </Route>
            <Route path={routePaths.onboarding.finished} element={<OnboardingFinished />} />
            <Route path={routePaths.login} element={<Login />} />
            <Route
              path={routePaths.home}
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.watering}
              element={
                <AuthRoute>
                  <Watering />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.plant.new}
              element={
                <AuthRoute>
                  <PlantNew />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.plant.base}
              element={
                <AuthRoute>
                  <Plant />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.plant.gallery}
              element={
                <AuthRoute>
                  <PlantGallery />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.base}
              element={
                <AuthRoute>
                  <Settings />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.tags}
              element={
                <AuthRoute>
                  <SettingsTags />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.modules}
              element={
                <AuthRoute>
                  <SettingsModules />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.a11y}
              element={
                <AuthRoute>
                  <SettingsA11y />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.password}
              element={
                <AuthRoute>
                  <SettingsPassword />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.about}
              element={
                <AuthRoute>
                  <SettingsAbout />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.releaseNotes}
              element={
                <AuthRoute>
                  <SettingsReleaseNotes />
                </AuthRoute>
              }
            />
            <Route
              path={routePaths.settings.bugReport}
              element={
                <AuthRoute>
                  <SettingsBugReport />
                </AuthRoute>
              }
            />
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
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
