import React from 'react'
import { routePaths } from 'routes'
import NotFoundIllustration from 'assets/404-illustration.svg'
import { Heading, Text } from 'components/Typography'
import { ButtonLink } from 'components/Button'

export default function NotFound() {
  return (
    <React.Fragment>
      <img
        src={NotFoundIllustration}
        loading="lazy"
        alt="Illustration of plants"
        aria-hidden="true"
      />
      <Heading color="greenDark" as="h2" mt="l" data-cy="404-title">
        Oops, how did you get here?
      </Heading>
      <Text color="beigeDark" mt="l" mb="l">
        Let’s just act like this never happend,
        <br />
        shall we?
      </Text>
      <ButtonLink to={routePaths.root} data-cy="404-back-to-root">
        Back to your plants
      </ButtonLink>
    </React.Fragment>
  )
}
