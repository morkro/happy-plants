import React from 'react'
import styled from 'styled-components'
import config from 'config'
import { useAppStore } from 'store'
import { Heading, Text } from 'components/Typography'
import { ButtonToggle } from 'components/Toggle'
import { setLocalEntry } from 'services/localStorage'
import { AnimationPreferences } from 'utilities/getAnimationPreference'

const A11ySection = styled.section`
  width: ${({ theme }) => `calc(100% + ${theme.spacings.l})`};
  background: ${(props) => props.theme.colors.white};
  padding: ${({ theme }) => theme.spacings.m};

  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacings.m};
  }
`

export default function SettingsA11y() {
  const { store, setStore } = useAppStore()
  const prefersEnabledAnimations = store.userPreferences.animations === 'enabled'

  function setPreference() {
    const preference: AnimationPreferences = prefersEnabledAnimations ? 'disabled' : 'enabled'
    setLocalEntry(config.localStorage.userAnimationPreference, preference)
    setStore({ userPreferences: { ...store.userPreferences, animations: preference } })
  }

  return (
    <React.Fragment>
      <A11ySection>
        <Heading as="h2" bold color="greenDark" mb="m">
          Animations
        </Heading>
        <ButtonToggle
          toggleDirection="right"
          pressed={prefersEnabledAnimations}
          mt="s"
          mb="m"
          onClick={setPreference}
          fullWidth
        >
          Enable animations
        </ButtonToggle>
        <Text color="beigeDark">
          This option lets you toggle all animations and transitions. Your current settings have
          them <strong>{prefersEnabledAnimations ? 'enabled' : 'disabled'}</strong>, based on your
          operating systems settings. Setting them explicitly will overwrite your systems settings.
        </Text>
      </A11ySection>
      <A11ySection>
        <Heading as="h2" bold color="greenDark" mb="m">
          Colors
        </Heading>
        <Text color="beigeDark">This option is not yet available.</Text>
      </A11ySection>
    </React.Fragment>
  )
}
