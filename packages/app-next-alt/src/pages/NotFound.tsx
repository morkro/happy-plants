import React from 'react'
import { routePaths } from 'routes'
import { Heading, Text } from 'components/Typography'
import { ButtonLink } from 'components/Button'
import IllustrationNotFound from 'components/IllustrationNotFound'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function NotFound() {
  const routeConfig = useRouteConfig('catchAll')
  return (
    <Layout {...routeConfig}>
      <IllustrationNotFound />
      <Heading color="greenDark" as="h2" mt="l" semiBold>
        Oops, how did you get here?
      </Heading>
      <Text color="beigeDark" mt="l" mb="l">
        Let&lsquo;s just act like this never happend,
        <br />
        shall we?
      </Text>
      <ButtonLink to={routePaths.root}>Back to your plants</ButtonLink>
    </Layout>
  )
}
