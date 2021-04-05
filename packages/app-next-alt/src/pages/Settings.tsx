import React from 'react'
import { initialStore, useAppStore } from 'store'
import { useHistory } from 'react-router'
import { routePaths } from 'routes'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { signOutUser } from 'services/firebase'
import logger from 'utilities/logger'
import { toast } from 'components/Toaster'
import delay from 'utilities/delay'
import { Heading } from 'components/Typography'

const SettingsHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.green};
`

const SettingsSection = styled.section`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacings.m};

  ul {
    list-style: none;
    width: 100%;
  }
`

export default function Settings() {
  const history = useHistory()
  const { setStore } = useAppStore()

  async function signOut() {
    setStore({ authLoader: { show: true, message: 'logout' } })

    try {
      await Promise.all([signOutUser(), delay(2000)])
      history.push(routePaths.home)
      setStore(initialStore)
    } catch (error) {
      setStore({ authLoader: { show: false } })
      logger(error, true)
      toast.error('There was an issue logging you out, please refresh.')
    }
  }

  return (
    <React.Fragment>
      <SettingsSection>
        <Heading as="h2" color="beigeDark">
          Account
        </Heading>
        <ul>
          <li>foo</li>
        </ul>
      </SettingsSection>
      <SettingsSection>
        <Heading as="h2" color="beigeDark">
          HappyPlants
        </Heading>
        <ul>
          <li>foo</li>
        </ul>
      </SettingsSection>
      <SettingsSection>
        <Heading as="h2" color="beigeDark">
          Application
        </Heading>
        <ul>
          <li>foo</li>
        </ul>
      </SettingsSection>
      <Button onClick={signOut} variant="alarm" size="s">
        Logout
      </Button>
    </React.Fragment>
  )
}
