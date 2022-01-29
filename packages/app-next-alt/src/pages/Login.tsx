import React, { useEffect, useState } from 'react'
import { Chrome, GitHub, Twitter } from 'react-feather'
import { useNavigate, useLocation } from 'react-router'
import { routePaths } from 'routes'
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import config from 'config'
import { AppState, useAppStore } from 'store'
import { FirebaseError } from 'firebase/app'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Text } from 'components/Typography'
import Layout, { BaseLayout } from 'components/Layout'
import { toast } from 'components/Toaster'
import useSearchParams from 'utilities/useSearchParams'
import {
  forgotPassword,
  getAuthRedirectResults,
  signInUser,
  FirestoreLoginProvider,
} from 'services/firebase'
import delay from 'utilities/delay'
import logger from 'utilities/logger'
import Spinner from 'components/Spinner'
import VisuallyHidden from 'components/VisuallyHidden'
import { deleteSessionEntry, getSessionEntry } from 'services/webStorage'
import getErrorMessage from 'utilities/getErrorMessage'
import useRouteConfig from 'utilities/useRouteConfig'

type LocationState = {
  from: {
    pathname: string
  }
}

const LoginGlobalStyle = createGlobalStyle`
  #root ${BaseLayout} {
    background-color: ${({ theme }) => theme.colors.green};
    background-image: url('assets/green-illustrated-bg.svg');
    background-repeat: no-repeat;
    background-position: top left;
    background-size: calc(100% - ${({ theme }) => theme.spacings.m} * 4) auto;
  }
`

const LoginContainer = styled.div`
  width: 100%;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    text-align: left;
    position: relative;
    margin-bottom: ${(props) => props.theme.spacings.l};
  }
`

const LoginButton = styled(Button)`
  box-shadow: 0 1px 2px ${({ theme }) => theme.colors.greenDark};
`

const ForgotPasswordLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  margin-top: calc(-0.5 * ${(props) => props.theme.spacings.m});
  margin-bottom: ${(props) => props.theme.spacings.m};

  &:hover {
    text-decoration: underline;
  }

  p {
    text-align: right;
  }
`

const FormSeperator = styled.div`
  display: block;
  margin: calc(2 * ${({ theme }) => theme.spacings.m}) 0;
  position: relative;
  width: 100%;
  text-align: center;

  & p {
    position: relative;
    z-index: 1;
    background: ${({ theme }) => theme.colors.green};
    display: inline-block;
  }

  & hr {
    border: none;
    border-top: 2px solid ${({ theme }) => theme.colors.greenDark};
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-1px);
  }
`

const LoginServices = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: ${({ theme }) => theme.spacings.m};

  & button {
    width: 100%;
  }
`

export default function Login() {
  const routeConfig = useRouteConfig('login')
  const navigate = useNavigate()
  const location = useLocation()
  const queries = useSearchParams()
  const { store, setStore } = useAppStore()
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isProgress, setIsProgress] = useState(false)
  const [showForgotPassword, setForgotPassword] = useState(queries.has('forgotPassword'))

  function getResetPasswordLink() {
    if (!showForgotPassword) {
      return `${routePaths.login}?forgotPassword`
    }
    return routePaths.login
  }

  function toggleResetPassword() {
    setForgotPassword(!showForgotPassword)
  }

  function showError(error: FirebaseError) {
    const errorMessage = getErrorMessage(error)

    if (errorMessage.type === 'password') {
      setPassword((p) => ({ ...p, error: errorMessage.message }))
    } else if (errorMessage.type === 'email') {
      setEmail((p) => ({ ...p, error: errorMessage.message }))
    }

    logger(errorMessage.message, true)
    if (!['password', 'email'].includes(errorMessage.type)) {
      toast.error(errorMessage.message)
    }
  }

  async function loginVia(provider: FirestoreLoginProvider) {
    setStore({ authLoader: { show: true, message: 'login' } })

    try {
      await signInUser({ provider, email: email.value, password: password.value })
      await delay(config.ui.authLoaderTimeout)
      const { from } = (location.state as LocationState) || { from: { pathname: routePaths.home } }
      navigate(from, { replace: true })
    } catch (error: any) {
      showError(error)
    } finally {
      setStore({ authLoader: { show: false } })
    }
  }

  async function formAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (showForgotPassword) {
      setIsProgress(true)
      try {
        await forgotPassword(email.value)
        toast('An email to reset your password has been sent.')
      } catch (error: any) {
        showError(error)
      } finally {
        setIsProgress(false)
      }
    } else {
      await loginVia('email')
    }
  }

  useEffect(() => {
    async function verifySession() {
      if (getSessionEntry(config.localStorage.userAuthProgress)) {
        deleteSessionEntry(config.localStorage.userAuthProgress)
        setStore({ authLoader: { show: true, message: 'login' } })

        if (!store.isSignedIn) {
          try {
            const [authResults]: [Partial<AppState>, void] = await Promise.all([
              getAuthRedirectResults(),
              delay(4000),
            ])
            setStore({ ...authResults })
          } catch (error: any) {
            logger(error.message, true)
            toast.error('There was an issue logging you in, please try again.')
          }
        }

        const locationState = location.state as { from?: Location }
        navigate(locationState?.from?.pathname || routePaths.home)
      }
    }

    verifySession()

    return () => {
      setStore({ authLoader: { show: false } })
    }
  }, [location, store.isSignedIn, setStore, navigate])

  return (
    <Layout {...routeConfig}>
      <LoginGlobalStyle />
      <LoginContainer>
        <LoginForm onSubmit={formAction}>
          <label htmlFor="email">
            <Text color="white" mb="m" as="span">
              Your email{' '}
              <span title="Required">
                {'*'}
                <VisuallyHidden>(required)</VisuallyHidden>
              </span>
            </Text>
            <Input
              required
              fullWidth
              type="email"
              value={email.value}
              placeholder="lover@plants.garden"
              id="email"
              autoComplete="username"
              error={email.error}
              data-cy="login-form-email"
              onChange={(event) => setEmail((d) => ({ ...d, value: event.target.value }))}
            />
          </label>

          {!showForgotPassword && (
            <label htmlFor="password">
              <Text color="white" mb="m" as="span">
                Your password{' '}
                <span title="Required">
                  {'*'}
                  <VisuallyHidden>(required)</VisuallyHidden>
                </span>
              </Text>
              <Input
                required
                fullWidth
                type="password"
                value={password.value}
                placeholder="********"
                id="password"
                autoComplete="current-password"
                error={password.error}
                data-cy="login-form-password"
                onChange={(event) => setPassword((d) => ({ ...d, value: event.target.value }))}
              />
            </label>
          )}

          <ForgotPasswordLink
            to={getResetPasswordLink()}
            onClick={toggleResetPassword}
            data-cy="login-form-forgot-pw"
          >
            <Text color="white" size="s">
              {showForgotPassword ? 'Show password field again' : 'I forgot my password'}
            </Text>
          </ForgotPasswordLink>

          <LoginButton
            aria-disabled={!showForgotPassword && password.value === ''}
            variant="warning"
            data-cy="login-form-submit"
            type="submit"
          >
            {isProgress && <Spinner aria-hidden="true" focusable="false" />}
            {showForgotPassword ? 'Send password reset' : 'Login'}
          </LoginButton>
        </LoginForm>

        <FormSeperator>
          <Text size="s" color="white" pl="m" pr="m">
            or login with
          </Text>
          <hr />
        </FormSeperator>

        <LoginServices>
          <Button
            border
            data-cy="form-service-google"
            onClick={async () => await loginVia('google')}
            type="button"
          >
            <Chrome aria-hidden="true" focusable="false" />
            Google
          </Button>
          <Button
            border
            data-cy="form-service-github"
            onClick={async () => await loginVia('github')}
            type="button"
          >
            <GitHub aria-hidden="true" focusable="false" />
            GitHub
          </Button>
          <Button
            border
            data-cy="form-service-twitter"
            onClick={async () => await loginVia('twitter')}
            type="button"
          >
            <Twitter aria-hidden="true" focusable="false" />
            Twitter
          </Button>
        </LoginServices>
      </LoginContainer>
    </Layout>
  )
}
