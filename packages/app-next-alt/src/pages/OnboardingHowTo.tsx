import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Heading, Text } from 'components/Typography'
import { OutletContext } from './Onboarding'

export default function OnboardingHowTo() {
  const {
    progress: [canContinue, setCanContinue],
  } = useOutletContext<OutletContext>()

  useEffect(() => {
    if (!canContinue) setCanContinue(true)
  }, [canContinue, setCanContinue])

  return (
    <React.Fragment>
      <Heading color="greenDark" as="h2" mt="auto" semiBold>
        Some nice illustrations here
      </Heading>
      <Text color="greenDark" mb="auto">
        Wow very informative
      </Text>
    </React.Fragment>
  )
}
