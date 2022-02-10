import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Chrome, GitHub, Twitter } from 'react-feather'
import { useOutletContext } from 'react-router-dom'
import IllustrationOnboardingAccount from 'components/IllustrationOnboardingAccount'
import { Heading, Text } from 'components/Typography'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { FirestoreLoginProvider } from 'services/firebase'
import { WithMarginStyles } from 'utilities/withProps'
import { OutletContext } from './Onboarding'

const Illustration = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacings.l};

  > svg {
    margin-bottom: -30px;
  }
`

const AccountSection = styled.section`
  ${WithMarginStyles}
  text-align: left;
  width: 100%;
`

const AccountNote = styled.div`
  width: 100%;
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spacings.l};
  padding: ${({ theme }) => theme.spacings.m};
  background: ${({ theme }) => theme.colors.blue};
  border-radius: ${({ theme }) => theme.baseRadius};
  filter: ${({ theme }) => `drop-shadow(0 2px 9px ${theme.colors.blue})`};

  &::after {
    content: '';
    background: ${({ theme }) => theme.colors.blue};
    display: block;
    position: absolute;
    bottom: -3px;
    right: ${({ theme }) => `calc(25% - ${theme.spacings.m})`};
    width: 15px;
    height: 15px;
    border-radius: ${({ theme }) => theme.baseRadius};
    transform: rotate(45deg);
  }

  p {
    text-align: right;
  }
`

const SocialLoginList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.m};
`

export default function OnboardingAccount() {
  const [email, setEmail] = useState({ value: '', error: '', isValidEmail: false })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loginProvider, setLoginProvider] = useState<FirestoreLoginProvider>()
  const {
    progress: [canContinue, setCanContinue],
    account: [setAccountProvider, setEmailPassword],
  } = useOutletContext<OutletContext>()

  function setProvider(type: FirestoreLoginProvider) {
    if (loginProvider !== type) {
      setLoginProvider(type)
    } else {
      setLoginProvider(undefined)
      setCanContinue(false)
    }
  }

  useEffect(() => {
    const hasEmailPwFilled = email.isValidEmail && password.value
    if (hasEmailPwFilled || loginProvider) {
      setCanContinue(true)
      setAccountProvider(hasEmailPwFilled ? 'email' : loginProvider)
    }
  }, [email.isValidEmail, password.value, loginProvider, setCanContinue, setAccountProvider])

  useEffect(() => {
    const hasEmailPwFilled = email.isValidEmail && password.value
    if (hasEmailPwFilled) {
      setEmailPassword({ email: email.value, password: password.value })
    }
  }, [email.isValidEmail, email.value, password.value, setEmailPassword])

  return (
    <React.Fragment>
      <Illustration>
        <IllustrationOnboardingAccount />
        <Heading color="greenDark" as="h2" mb="l" semiBold>
          How do you want to use your
          <br />
          account?
        </Heading>
      </Illustration>

      <AccountSection mb="l">
        <label htmlFor="email">
          <Text color="greenDark" mb="m" as="span">
            Email and password
          </Text>
          <Input
            fullWidth
            value={email.value}
            placeholder="lover@plants.garden"
            id="email"
            type="email"
            error={email.error}
            mb="m"
            onChange={(event) => {
              setLoginProvider(undefined)
              setEmail((d) => ({
                ...d,
                value: event.target.value,
                isValidEmail: event.target.validity.valid,
              }))
            }}
          />
          <Input
            fullWidth
            type="password"
            value={password.value}
            placeholder="********"
            id="password"
            error={password.error}
            onChange={(event) => {
              setLoginProvider(undefined)
              setPassword((d) => ({ ...d, value: event.target.value }))
            }}
          />
        </label>
      </AccountSection>

      <AccountSection mb="auto">
        <label htmlFor="social">
          <Text color="greenDark" mb="m" as="span">
            Social login
          </Text>
          <SocialLoginList>
            <li>
              <Button
                color="green"
                border={loginProvider !== 'google'}
                onClick={() => setProvider('google')}
              >
                <Chrome aria-hidden="true" focusable="false" />
                Google
              </Button>
            </li>
            <li>
              <Button
                color="green"
                border={loginProvider !== 'github'}
                onClick={() => setProvider('github')}
              >
                <GitHub aria-hidden="true" focusable="false" />
                GitHub
              </Button>
            </li>
            <li>
              <Button
                color="green"
                border={loginProvider !== 'twitter'}
                onClick={() => setProvider('twitter')}
              >
                <Twitter aria-hidden="true" focusable="false" />
                Twitter
              </Button>
            </li>
          </SocialLoginList>
        </label>
      </AccountSection>

      {canContinue ? (
        <AccountNote>
          <Text color="white" size="s">
            By tapping next,{' '}
            {loginProvider
              ? `you will be navigated to ${loginProvider} to sign in, then send back.`
              : 'your account will be created.'}
          </Text>
        </AccountNote>
      ) : null}
    </React.Fragment>
  )
}
