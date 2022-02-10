import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { routePaths } from 'routes'
import styled from 'styled-components'
import { useAppStore } from 'store'
import config from 'config'
import { FirebaseError } from 'firebase/app'
import Layout from 'components/Layout'
import { Button, ButtonLink } from 'components/Button'
import {
  createAccount,
  FirestoreLoginProvider,
  getAuthRedirectResults,
  signInUser,
} from 'services/firebase'
import { getRouteConfig } from 'utilities/useRouteConfig'
import delay from 'utilities/delay'
import getErrorMessage from 'utilities/getErrorMessage'
import logger from 'utilities/logger'
import { toast } from 'components/Toaster'
import { deleteSessionEntry, getSessionEntry } from 'services/webStorage'

const onboardingFlow = [
  routePaths.root,
  routePaths.onboarding.howTo,
  routePaths.onboarding.account,
  routePaths.onboarding.finished,
]

const OnboardingProgress = styled.progress`
  appearance: none;
  width: ${({ theme }) => `calc(100% + (2.5 * ${theme.spacings.m}))`};
  height: 4px;
  top: 0;
  /* Firefox only */
  background-color: ${({ theme }) => theme.colors.white};
  border: none;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::-webkit-progress-value,
  &::-moz-progress-bar {
    background-color: ${({ theme }) => theme.colors.green};
    transition: width var(--base-transition) ease-in-out;
  }

  &:indeterminate::-moz-progress-bar {
    width: 0;
  }
`

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.m};
  padding-bottom: ${({ theme }) => `calc(1.25 * ${theme.spacings.m})`};
  width: 100%;

  a:first-of-type {
    --base-color: ${({ theme }) => theme.colors.green};
    --text-color: ${({ theme }) => theme.colors.green};
  }
`

type EmailPassword = { email: string; password: string }
type SetState<S> = React.Dispatch<React.SetStateAction<S>>

export interface OutletContext {
  progress: [boolean, SetState<boolean>]
  account: [SetState<FirestoreLoginProvider | undefined>, SetState<EmailPassword>]
}

export default function Onboarding() {
  const location = useLocation()
  const navigate = useNavigate()
  const { store, setStore } = useAppStore()
  const [routeConfig, setRouteConfig] = useState(getRouteConfig('onboarding'))
  const [navIndex, setNavIndex] = useState(0)
  const [canContinue, setCanContinue] = useState(false)
  const [accountProvider, setAccountProvider] = useState<FirestoreLoginProvider>()
  const [emailPassword, setEmailPassword] = useState<EmailPassword>({ email: '', password: '' })
  const outletContext: OutletContext = {
    progress: [canContinue, setCanContinue],
    account: [setAccountProvider, setEmailPassword],
  }

  useEffect(() => {
    const index = onboardingFlow.findIndex((r) => r === location?.pathname)
    let configName = 'onboarding'
    if (index === 1) configName = 'onboardingHowTo'
    if (index === 2) configName = 'onboardingAccount'
    if (index === 3) configName = 'onboardingFinished'

    setNavIndex(index)
    setRouteConfig(getRouteConfig(configName))
    setCanContinue(false)
  }, [location?.pathname])

  useEffect(() => {
    async function verifySession() {
      if (getSessionEntry(config.localStorage.userAuthProgress)) {
        deleteSessionEntry(config.localStorage.userAuthProgress)
        setStore({ authLoader: { show: true, message: 'create' } })
        await delay(2000)

        if (!store.isSignedIn) {
          try {
            const { user, isSignedIn } = await getAuthRedirectResults()
            setStore({ user, isSignedIn })
          } catch (error) {
            logger(error as string, true)
            toast.error('There was an creating your account, please try again.')
          }
        }

        setStore({ authLoader: { show: false } })
        navigate(routePaths.onboarding.finished)
      }
    }

    verifySession()
  }, [location, store.isSignedIn, setStore, navigate])

  async function handleNextStep() {
    if (canContinue && navIndex !== 2) {
      navigate(onboardingFlow[navIndex + 1])
    } else if (canContinue && navIndex === 2) {
      try {
        if (accountProvider === 'email') {
          setStore({ authLoader: { show: true, message: 'create' } })
          await createAccount(emailPassword.email, emailPassword.password)
        } else {
          await signInUser({
            provider: accountProvider!,
            email: emailPassword.email,
            password: emailPassword.password,
          })
        }
        await delay(config.ui.authLoaderTimeout)
        navigate(routePaths.onboarding.finished)
      } catch (error) {
        const errorMessage = getErrorMessage(error as FirebaseError)
        logger(errorMessage.message, true)
        toast.error(errorMessage.message)
      } finally {
        setStore({ authLoader: { show: false } })
      }
    }
  }

  return (
    <Layout {...routeConfig}>
      <OnboardingProgress max={onboardingFlow.length - 1} value={navIndex}>
        {`${navIndex}/${onboardingFlow.length - 1}`}
      </OnboardingProgress>

      <Outlet context={outletContext} />

      <Actions>
        <ButtonLink to={onboardingFlow[navIndex === 0 ? navIndex : navIndex - 1]} border fullWidth>
          Back
        </ButtonLink>
        <Button onClick={handleNextStep} aria-disabled={!canContinue} fullWidth>
          Next
        </Button>
      </Actions>
    </Layout>
  )
}
