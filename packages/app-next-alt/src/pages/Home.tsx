import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import config, { PlantOrderMap, PlantOrderType } from 'config'
import { Search, Sliders, X } from 'react-feather'
import { theme } from 'theme'
import { generatePath, useNavigate } from 'react-router-dom'
import { routePaths } from 'routes'
import { orderBy, query, QuerySnapshot } from 'firebase/firestore'
import { Heading, Text } from 'components/Typography'
import EmptyDataIllustration from 'components/EmptyDataIllustration'
import { getCollection, FirestoreCollections } from 'services/firebase'
import { toast } from 'components/Toaster'
import { getLocalEntry } from 'services/webStorage'
import { AppHeaderButton, AppHeaderPortal } from 'components/AppHeader'
import VisuallyHidden from 'components/VisuallyHidden'
import useSearchParams from 'utilities/useSearchParams'
import HomeOptions from 'components/HomeOptions'
import PlantPreview from 'components/PlantPreview'
import { Plant } from 'typings/plant'
import { Input } from 'components/Input'
import useUserInfo from 'utilities/useUserInfo'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

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

function usePlantList(snapshot?: QuerySnapshot, searchQuery = '') {
  const mappedList = snapshot?.docs?.map((doc) => doc.data() as Plant)
  return searchQuery === ''
    ? mappedList
    : mappedList?.filter((plant) => plant.name.includes(searchQuery))
}

export default function Home() {
  const routeConfig = useRouteConfig('home')
  const navigate = useNavigate()
  const queries = useSearchParams()
  const userInfo = useUserInfo()
  const [showOptions, setShowOptions] = useState(queries.has('options'))
  const [showSearch, setShowSearch] = useState(queries.has('search'))
  const [search, setSearch] = useState('')
  const [storageOrderBy] = useState(
    (getLocalEntry(config.localStorage.homeOrderBy) as PlantOrderType) ?? PlantOrderType.Latest
  )
  const [orderType, orderDirection] = config.ui.plantOrderMap.get(storageOrderBy) as PlantOrderMap
  const [snapshot, loading, error] = useCollection(
    query(
      getCollection(userInfo.id, FirestoreCollections.Plants),
      orderBy(orderType, orderDirection)
    )
  )
  const plantDataList = usePlantList(snapshot, search)

  function closeActions() {
    if (showOptions) setShowOptions(false)
    if (showSearch) setShowSearch(false)
    if (search !== '') setSearch('')

    navigate(routePaths.home, { replace: true })
  }

  function triggerOptions() {
    setShowOptions(true)
    navigate(`${routePaths.home}?options`, { replace: true })
  }

  useEffect(() => {
    if (error !== undefined) {
      toast.error(error?.message || 'Failed to load your data. Please reload.')
    }
  }, [error])

  return (
    <Layout {...routeConfig}>
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
                list="search-list"
                // onClick={() => history.replace(`${routePaths.home}?search`)}
                onChange={(event) => setSearch(event.target.value)}
                // onChange={(event) => console.log(event)}
              />
            </label>
            {!loading && !snapshot?.empty && (
              <datalist id="search-list">
                {snapshot?.docs.map((doc) => {
                  const data = doc.data() as Plant
                  return <option key={doc.id} value={data.name} />
                })}
              </datalist>
            )}
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
          {plantDataList?.map((plant) => (
            <li key={plant.guid + plant.name}>
              <PlantPreview
                loading={false}
                name={plant.name}
                href={generatePath(routePaths.plant.base, { id: plant.guid })}
                imageUrl={plant.imageURL}
              />
            </li>
          ))}
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
    </Layout>
  )
}
