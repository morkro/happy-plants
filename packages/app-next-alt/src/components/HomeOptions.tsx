import { HomeFilterBy, HomeOrderBy, HomeViewmode } from 'config'
import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'
import { PlantTag } from 'typings/plant'
import BaseSVG from './BaseSVG'
import { Input } from './Input'
import Spinner from './Spinner'
import { Heading, Text } from './Typography'

const OptionsContainer = styled.div`
  position: fixed;
  z-index: 4;
  top: 0;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: ${({ theme }) => theme.frameWidgetHeight};

  section {
    padding: ${({ theme }) => `${theme.spacings.m} ${theme.spacings.m} 0`};
    position: relative;
    min-height: 275px;
    max-height: 50vh;
    overflow: scroll;
  }

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
  }
`

const OptionsList = styled.ul`
  li {
    margin-bottom: ${({ theme }) => theme.spacings.m};
  }

  label {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-gap: ${({ theme }) => theme.spacings.m};
  }
`

export type HomeOptionsProps = React.PropsWithChildren<{
  tags?: PlantTag[]
  loading: boolean
  orderBy: HomeOrderBy
  onChangeOrderBy: (value: HomeOrderBy) => void
  viewmode: HomeViewmode
  onChangeViewmode: (value: HomeViewmode) => void
  filterBy: HomeFilterBy
}>

export default function HomeOptions(props: HomeOptionsProps) {
  const { tags, loading, orderBy, viewmode, filterBy, onChangeViewmode, onChangeOrderBy } = props
  return (
    <OptionsContainer>
      <section>
        <Heading color="greenDark" as="h2" mb="l">
          Viewmode
        </Heading>
        <OptionsList>
          <li>
            <label htmlFor="viewmode-grid">
              <Input
                type="radio"
                id="viewmode-grid"
                name="viewmode"
                value="grid"
                checked={viewmode === HomeViewmode.Grid}
                onClick={() => onChangeViewmode(HomeViewmode.Grid)}
              />
              <Text color="beigeDark">Grid</Text>
            </label>
          </li>
          <li>
            <label htmlFor="viewmode-list">
              <Input
                type="radio"
                id="viewmode-list"
                name="viewmode"
                value="list"
                checked={viewmode === HomeViewmode.List}
                onClick={() => onChangeViewmode(HomeViewmode.List)}
              />
              <Text color="beigeDark">List</Text>
            </label>
          </li>
        </OptionsList>
        <Heading color="greenDark" as="h2" mb="l" mt="l">
          Order by
        </Heading>
        <OptionsList>
          <li>
            <label htmlFor="orderby-latest">
              <Input
                type="radio"
                id="orderby-latest"
                name="orderby"
                value="latest"
                checked={orderBy === HomeOrderBy.Latest}
                onClick={() => onChangeOrderBy(HomeOrderBy.Latest)}
              />
              <Text color="beigeDark">Latest</Text>
            </label>
          </li>
          <li>
            <label htmlFor="orderby-alphabetically">
              <Input
                type="radio"
                id="orderby-alphabetically"
                name="orderby"
                value="alphabetically"
                checked={orderBy === HomeOrderBy.Alphabetically}
                onClick={() => onChangeOrderBy(HomeOrderBy.Alphabetically)}
              />
              <Text color="beigeDark">Alphabetically</Text>
            </label>
          </li>
        </OptionsList>
      </section>

      <section>
        <Heading color="greenDark" as="h2" mb="l">
          Filter by <span>{filterBy}</span>
        </Heading>
        {loading ? (
          <Spinner />
        ) : (
          <OptionsList>
            <li>
              <label htmlFor="filter-tag">
                <Input type="checkbox" name="types" value="types" />
                <Text color="beigeDark">Show all</Text>
              </label>
            </li>
            {tags?.map((tag) => (
              <li key={tag.id}>
                <label htmlFor="filter-tag">
                  <Input type="checkbox" name={tag.label} value={tag.value} />
                  <Text color="beigeDark">{tag.label}</Text>
                </label>
              </li>
            ))}
          </OptionsList>
        )}
      </section>

      <BaseSVG viewBox="0 0 360 32">
        <path
          fill={theme.colors.white}
          fillRule="evenodd"
          d="M202.13 18.156c.386 3.896.201 1.481.035 6.35-.034 1.002-.48 1.648-1.32 1.98-7.018 2.764-32.58 5.9-39.062 4.755-.876-2.465-1.016-5.159-.422-7.188 1.09-.84 0 .117 21.717-2.63 10.732-1.358 14.256-2.554 16.625-3.093.701-.16 1.395-.545 2.426-.174zM360 0v10.245c-3.864 3.4-10.353 1.537-26.979.121-102.7-8.747-132.682 15.276-244.46 8.368-75.47-4.665-51.996-2.844-76.452-6.022l.09-.354C7.145 11.283 2.97 10.646 0 9.73L.002 0h360z"
        />
      </BaseSVG>
    </OptionsContainer>
  )
}
