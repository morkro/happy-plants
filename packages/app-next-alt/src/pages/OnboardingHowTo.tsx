import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Heading, Text } from 'components/Typography'

export default function OnboardingHowTo() {
  const [_, setCanContinue] =
    useOutletContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>()

  useEffect(() => {
    setCanContinue(true)
  })

  return (
    <React.Fragment>
      <Heading color="greenDark" as="h2" mt="l" semiBold>
        Some nice illustrations here
      </Heading>
      <Text color="greenDark" mb="auto">
        Wow very informative
      </Text>
    </React.Fragment>
  )
}
