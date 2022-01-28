import React from 'react'
import { initialStore, useAppStore } from 'store'
import { useNavigate } from 'react-router-dom'
import { routePaths } from 'routes'
import styled from 'styled-components'
import { ArrowRight, Smile } from 'react-feather'
import { Link } from 'react-router-dom'
import config from 'config'
import { theme } from 'theme'
import { Button } from 'components/Button'
import { signOutUser } from 'services/firebase'
import logger from 'utilities/logger'
import { toast } from 'components/Toaster'
import delay from 'utilities/delay'
import { Heading, Text } from 'components/Typography'
import BaseSVG from 'components/BaseSVG'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

const SettingsHeader = styled.header`
  --avatar-size: 45px;
  position: relative;
  width: ${({ theme }) => `calc(100% + 2 * ${theme.spacings.m})`};
  margin-bottom: 15%;

  svg {
    position: absolute;
    z-index: -1;
    width: calc(100% + 2 * ${({ theme }) => theme.spacings.m});
    left: calc(-1 * ${({ theme }) => theme.spacings.m});
    bottom: 0;
    transform: translateY(35%);
  }
`

const SettingsHeaderContent = styled.div`
  display: grid;
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.spacings.m};
  grid-template-columns: var(--avatar-size) 1fr;
  column-gap: ${({ theme }) => theme.spacings.l};
`

const SettingsAvatar = styled.div`
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: ${({ theme }) => theme.baseRadius};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.yellow};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.greenDark};

  img {
    object-fit: cover;
    aspect-ratio: 1 / 1;
    width: 100%;
  }
`

const SettingsSection = styled.section`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacings.m};
  margin-bottom: ${({ theme }) => theme.spacings.m};

  h2 {
    display: flex;
    align-items: center;

    svg {
      margin-right: ${({ theme }) => theme.spacings.m};
    }
  }
`

const SettingsList = styled.ul`
  list-style: none;
  width: 100%;

  li {
    border-radius: ${({ theme }) => theme.baseRadius};
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 2px;
  }

  a {
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  a,
  li > div {
    padding: ${({ theme }) => `${theme.spacings.l} ${theme.spacings.l}`};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const menu = {
  happyplants: [
    {
      label: 'Tags',
      link: routePaths.settings.tags,
    },
    {
      label: 'Modules',
      link: routePaths.settings.modules,
    },
    {
      label: 'Accessibility',
      link: routePaths.settings.a11y,
    },
  ],
  account: [
    {
      label: 'Change email',
      link: routePaths.settings.email,
    },
    {
      label: 'Change password',
      link: routePaths.settings.password,
    },
  ],
  application: [
    {
      label: 'About',
      link: routePaths.settings.about,
    },
    {
      label: 'Release notes',
      link: routePaths.settings.releaseNotes,
    },
    {
      label: 'Bug reports',
      link: routePaths.settings.bugReport,
    },
  ],
}

function SettingsMenuItem(props: { label: string; link: string }) {
  return (
    <li>
      <Link to={props.link}>
        <Text color="greenDark" semiBold>
          {props.label}
        </Text>
        <ArrowRight color={theme.colors.greenDark} aria-hidden="true" focusable="false" />
      </Link>
    </li>
  )
}

export default function Settings() {
  const routeConfig = useRouteConfig('settingsBase')
  const navigate = useNavigate()
  const { store, setStore } = useAppStore()

  async function signOut() {
    setStore({ authLoader: { show: true, message: 'logout' } })

    try {
      await Promise.all([signOutUser(), delay(2000)])
      navigate(routePaths.home)
      setStore(initialStore)
    } catch (error: any) {
      setStore({ authLoader: { show: false } })
      logger(error.message, true)
      toast.error('There was an issue logging you out, please refresh.')
    }
  }

  return (
    <Layout {...routeConfig}>
      <SettingsHeader>
        <SettingsHeaderContent>
          <SettingsAvatar role="img" aria-label={store.user?.displayName || undefined}>
            {store.user?.photoURL ? (
              <img src={store.user?.photoURL} loading="lazy" alt="" />
            ) : (
              <Smile color={theme.colors.greenDark} />
            )}
          </SettingsAvatar>
          <div>
            <Text color="white" size="m" bold>
              {store.user?.displayName}
            </Text>
          </div>
        </SettingsHeaderContent>
        <BaseSVG viewBox="0 0 360 204">
          <g fill="none" fillRule="evenodd">
            <path
              fill={theme.colors.white}
              d="M324.238 61.787c11.994-6.299 24.425-9.031 35.763-7.254L360 124.576c-5.01 4.241-9.168 9.434-10.95 17.276-2.065 9.087-2.39 18-3.618 25.087-2.813 16.261-16.19 28.217-32.846 34.848-7.36 2.913-14.782 2.891-22.31.283-9.082-3.142-10.878-8.562-13.404-15.219l-.508-1.325c-8.31-21.348-53.772-8.282-70.316-34.63-12.272-19.522 5.436-49.326 25.359-58.587 18.445-8.585 35.306-8.467 44.215-9.249l.602-.055c21.887-2.152 32.218-12.913 48.014-21.218zM201.593 168.182c.093 3.685-1.334 6.48-4.166 8.449-7.948 5.526-14.643-1.645-13.24-7.231 1.839-7.324 6.636-15.157 12.211-11.448 3.529 2.35 5.099 5.84 5.195 10.23"
            />
            <path fill={theme.colors.green} d="M0 0h360v139H0z" />
            <path
              fill={theme.colors.green}
              d="M295.782 119.436c16.422 2.233 42.549 6.005 56.274 11.532 3.435 1.375 5.867 3.357 7.122 5.737 1.864 3.488.515 5.254-3.616 7.255-13.441 6.46-27.08 5.92-43.125 3.407-17.813-2.788-29.088 3.744-35.93 6.846-6.757 3.062-14.265 4.168-22.392 3.717-22.653-1.243-23.708-6.385-46.906-12.24-19.238-4.856-28.679 4.75-39.802 10.478-45.202 23.275-68.645-18.366-116.215-.053-7.166 2.758-19.463 8.763-25.671 11.115-6.98 2.644-18.093 3.623-25.522-1.227v-48.19c3.495-6.366 8.947-12.186 16.185-17.433 33.551-24.413 98.474-5.552 279.598 19.056z"
            />
          </g>
        </BaseSVG>
      </SettingsHeader>

      <SettingsSection>
        <Heading as="h2" color="beigeDark" mb="m">
          HappyPlants
        </Heading>
        <SettingsList>
          {menu.happyplants.map((item, index) => (
            <SettingsMenuItem key={item.label + index} {...item} />
          ))}
        </SettingsList>
      </SettingsSection>

      <SettingsSection>
        <Heading as="h2" color="beigeDark" mb="m">
          Account
        </Heading>
        <SettingsList>
          {menu.account.map((item, index) => (
            <SettingsMenuItem key={item.label + index} {...item} />
          ))}
        </SettingsList>
      </SettingsSection>

      <SettingsSection>
        <Heading as="h2" color="beigeDark" mb="m">
          Application
        </Heading>
        <SettingsList>
          {menu.application.map((item, index) => (
            <SettingsMenuItem key={item.label + index} {...item} />
          ))}
          <li>
            <div>
              <Text color="greenDark" semiBold>
                Version
              </Text>
              <Text color="greenDark">{config.version}</Text>
            </div>
          </li>
        </SettingsList>
      </SettingsSection>

      <Button onClick={signOut} variant="alarm" size="s" mt="m" mb="l">
        Logout
      </Button>
    </Layout>
  )
}
