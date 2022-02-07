import React from 'react'
import styled from 'styled-components'
import { Smile } from 'react-feather'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'
import { Button } from 'components/Button'

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  > div > button {
    margin-bottom: 10px;
  }
`

export default function OnboardingFinished() {
  const routeConfig = useRouteConfig('onboardingFinished')
  return (
    <Layout {...routeConfig}>
      <Container>
        <div>
          <Button color="green">Variant Normal</Button>
          <Button color="green" size="s">
            Normal Size S
          </Button>
          <Button color="blue">Variant Info</Button>
          <Button color="blue" size="s">
            Info Size S
          </Button>
          <Button color="yellow">Variant Warning</Button>
          <Button color="yellow" size="s">
            Warning Size S
          </Button>
          <Button color="red">Variant Alarm</Button>
          <Button color="red" size="s">
            Alarm Size S
          </Button>
          <Button color="white">Variant Blank</Button>
          <Button color="white" size="s">
            Blank Size S
          </Button>
        </div>
        <div>
          <Button border color="green">
            Normal Border
          </Button>
          <Button border color="green" size="s">
            Border Size S
          </Button>
          <Button border color="blue">
            Info Border
          </Button>
          <Button border color="blue" size="s">
            Border Size S
          </Button>
          <Button border color="yellow">
            Warning Border
          </Button>
          <Button border color="yellow" size="s">
            Border Size S
          </Button>
          <Button border color="red">
            Alarm Border
          </Button>
          <Button border color="red" size="s">
            Border Size S
          </Button>
          <Button border color="white">
            Blank Border
          </Button>
          <Button border color="white" size="s">
            Border Size S
          </Button>
        </div>
      </Container>
      <Button fullWidth mb="m">
        Default props fullWidth
      </Button>
      <Container>
        <Button round>
          <Smile />
        </Button>
        <Button round border>
          <Smile />
        </Button>
        <Button round border color="red" size="s">
          <Smile />
        </Button>
      </Container>
    </Layout>
  )
}
