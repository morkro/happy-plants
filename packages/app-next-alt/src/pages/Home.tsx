import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import config, { PlantOrderMap, PlantOrderType } from 'config'
import { Search, Sliders, X } from 'react-feather'
import { theme } from 'theme'
import { generatePath, useHistory } from 'react-router'
import { routePaths } from 'routes'
import { Heading, Text } from 'components/Typography'
import EmptyDataIllustration from 'components/EmptyDataIllustration'
import { getCollection } from 'services/firebase'
import { FirestoreCollections } from 'typings/firebase'
import { toast } from 'components/Toaster'
import { getLocalEntry } from 'services/localStorage'
import { AppHeaderButton, AppHeaderPortal } from 'components/AppHeader'
import VisuallyHidden from 'components/VisuallyHidden'
import useSearchParams from 'utilities/useSearchParams'
import HomeOptions from 'components/HomeOptions'
import PlantPreview from 'components/PlantPreview'
import { Plant } from 'typings/plant'
import { Input } from 'components/Input'
import useUserInfo from 'utilities/useUserInfo'

const PlantList = styled.ul`
  --grid-item-height: calc(50vw - 1.5 * ${({ theme }) => theme.spacings.m});
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: var(--grid-item-height);
  grid-gap: ${({ theme }) => theme.spacings.m};
`

const EmptyDataContainer = styled.div`
  width: 65%;

  h2 {
    line-height: 160%;
  }
`

const SearchContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.frameWidgetHeight};
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 0;
  left: 0;
  display: flex;

  label,
  input {
    width: 100%;
  }

  input:active,
  input:focus {
    box-shadow: inset 0 2px 9px var(--brand-black-50);
    border-color: ${({ theme }) => theme.colors.white};
  }
`

function EmptyData() {
  return (
    <EmptyDataContainer>
      <EmptyDataIllustration />
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

export default function Home() {
  const history = useHistory()
  const queries = useSearchParams()
  const userInfo = useUserInfo()
  const [showOptions, setShowOptions] = useState(queries.has('options'))
  const [showSearch, setShowSearch] = useState(queries.has('search'))
  const [search, setSearch] = useState(queries.get('search') ?? '')
  const [orderBy] = useState(
    (getLocalEntry(config.localStorage.homeOrderBy) as PlantOrderType) ?? PlantOrderType.Latest
  )
  const [orderType, orderDirection] = config.ui.plantOrderMap.get(orderBy) as PlantOrderMap
  const [snapshot, loading, error] = useCollection(
    getCollection(userInfo.id, FirestoreCollections.Plants).orderBy(orderType, orderDirection)
  )

  function closeActions() {
    if (showOptions) setShowOptions(false)
    if (showSearch) setShowSearch(false)

    history.replace(routePaths.home)
  }

  function triggerOptions() {
    setShowOptions(true)
    history.replace(`${routePaths.home}?options`)
  }

  useEffect(() => {
    history.replace(`${routePaths.home}?search=${search}`)
  }, [history, search])

  useEffect(() => {
    if (error !== undefined) {
      toast.error(error?.message || 'Failed to load your data. Please reload.')
    }
  }, [error])

  return (
    <React.Fragment>
      <AppHeaderPortal.Source>
        {showSearch && (
          <SearchContainer>
            <label htmlFor="plant-search">
              <Input
                type="text"
                fullWidth
                id="plant-search"
                aria-placeholder="Search"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </SearchContainer>
        )}

        {/* Only display when either options or search are active. */}
        {showOptions || showSearch ? (
          <AppHeaderButton onClick={closeActions}>
            <X color={theme.colors.greenDark} aria-hidden="true" focusable="false" />
            <VisuallyHidden>Close {showSearch ? 'search' : 'options'}</VisuallyHidden>
          </AppHeaderButton>
        ) : (
          <React.Fragment>
            <AppHeaderButton onClick={() => setShowSearch(true)}>
              <Search color={theme.colors.greenDark} aria-hidden="true" focusable="false" />
              <VisuallyHidden>Search</VisuallyHidden>
            </AppHeaderButton>
            <AppHeaderButton onClick={triggerOptions}>
              <Sliders color={theme.colors.greenDark} aria-hidden="true" focusable="false" />
              <VisuallyHidden>Configure view</VisuallyHidden>
            </AppHeaderButton>
          </React.Fragment>
        )}
      </AppHeaderPortal.Source>

      {showOptions && <HomeOptions />}

      {!loading && !snapshot?.empty ? (
        <PlantList>
          {snapshot?.docs.map((doc) => {
            const data = doc.data() as Plant
            return (
              <li key={doc.id}>
                <PlantPreview
                  loading={false}
                  name={data.name}
                  href={generatePath(routePaths.plant.base, { id: data.guid })}
                  imageUrl={data.imageURL}
                />
              </li>
            )
          })}
        </PlantList>
      ) : (
        <PlantList>
          {new Array(5).fill({}).map((_, index) => (
            <li key={`plant-loading-${index}`}>
              <PlantPreview loading />
            </li>
          ))}
        </PlantList>
      )}

      {!loading && snapshot?.empty && <EmptyData />}
    </React.Fragment>
  )
}
