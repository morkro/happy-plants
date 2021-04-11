import React from 'react'
import styled from 'styled-components'
import config from 'config'
import { useAppStore } from 'store'
import { Heading, Text } from 'components/Typography'
import { ButtonToggle } from 'components/Toggle'
import { setLocalEntry } from 'services/localStorage'

const A11ySection = styled.section`
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacings.l};
  }
`

export default function SettingsA11y() {
  const { store, setStore } = useAppStore()
  const prefersEnabledAnimations = store.userPreferences.animations === 'enabled'

  function setPreference() {
    const preference = prefersEnabledAnimations ? 'disabled' : 'enabled'
    setLocalEntry(config.session.userAnimationPreference, preference)
    setStore({ userPreferences: { ...store.userPreferences, animations: preference } })
  }

  return (
    <React.Fragment>
      <A11ySection>
        <Heading as="h2" bold color="beigeDark" mb="m">
          Animations
        </Heading>
        <Text color="greenDark">
          This option lets you toggle all animations and transitions. Your current settings have
          them <strong>{prefersEnabledAnimations ? 'enabled' : 'disabled'}</strong>, based on your
          operating systems settings. Setting them explicitly will overwrite your systems settings.
        </Text>
        <ButtonToggle
          pressed={store.userPreferences.animations === 'enabled'}
          mt="l"
          onClick={setPreference}
        >
          Enable animation
        </ButtonToggle>
      </A11ySection>
      <A11ySection>
        <Heading as="h2" bold color="beigeDark" mb="m">
          Colors
        </Heading>
        <Text color="beigeDark">This option is not yet available.</Text>
      </A11ySection>
    </React.Fragment>
  )
}
