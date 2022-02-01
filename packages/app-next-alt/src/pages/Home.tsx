import React, { useState } from 'react'
import styled from 'styled-components'
import { Search, Sliders, X } from 'react-feather'
import { generatePath, useNavigate } from 'react-router-dom'
import { theme } from 'theme'
import { routePaths } from 'routes'
import { Heading, Text } from 'components/Typography'
import EmptyDataIllustration from 'components/EmptyDataIllustration'
import { AppHeaderButton, AppHeaderPortal } from 'components/AppHeader'
import VisuallyHidden from 'components/VisuallyHidden'
import HomeOptions from 'components/HomeOptions'
import PlantPreview from 'components/PlantPreview'
import { Input } from 'components/Input'
import Layout from 'components/Layout'
import { usePlantDocs } from 'services/firebase'
import useSearchParams from 'utilities/useSearchParams'
import useRouteConfig from 'utilities/useRouteConfig'
import { Plant } from 'typings/plant'

const PlantList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
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

function filterPlants(collectionData?: Plant[], searchQuery = '') {
  return searchQuery === ''
    ? collectionData
    : collectionData?.filter((plant) => plant.name.includes(searchQuery))
}

export default function Home() {
  const routeConfig = useRouteConfig('home')
  const navigate = useNavigate()
  const queries = useSearchParams()
  const [collectionData, loading] = usePlantDocs()
  const [showOptions, setShowOptions] = useState(queries.has('options'))
  const [showSearch, setShowSearch] = useState(queries.has('search'))
  const [search, setSearch] = useState('')
  const plantDataList = filterPlants(collectionData, search)

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
            {!loading && collectionData?.length !== 0 && (
              <datalist id="search-list">
                {collectionData?.map((doc) => (
                  <option key={doc.id} value={doc.name} />
                ))}
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

      {!loading && collectionData?.length !== 0 ? (
        <PlantList>
          {plantDataList?.map((plant) => (
            <li key={plant.id + plant.name}>
              <PlantPreview
                loading={false}
                name={plant.name}
                href={generatePath(routePaths.plant.base, { id: plant.id })}
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

      {!loading && collectionData?.length === 0 && <EmptyData />}
    </Layout>
  )
}
