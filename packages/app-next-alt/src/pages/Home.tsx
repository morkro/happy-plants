import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading, Text } from 'components/Typography'
import EmptyDataIllustration from 'components/EmptyDataIllustration'

const EmptyDataContainer = styled.div`
  width: 65%;

  h2 {
    line-height: 160%;
  }
`

export default function Home() {
  const [isLoadingPlants, setLoadingPlants] = useState(true)
  return (
    <EmptyDataContainer>
      <EmptyDataIllustration aria-hidden="true" />
      <Heading as="h2" size="l" color="beigeDark" center>
        You haven&apos;t added
        <br />
        any friends yet.
      </Heading>
      <Text color="beigeDark" mt="l" center>
        Do it! It feels good.
      </Text>
    </EmptyDataContainer>
  )
}
