import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import categoriesData from 'data/categories'
import { PlantCategory } from 'typings/plant'
import noop from 'utilities/noop'
import { Input } from './Input'
import { Text } from './Typography'

const List = styled.ul`
  li:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.m};
  }

  label {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-gap: ${({ theme }) => theme.spacings.m};
  }
`

export interface CategoriesListProps {
  selected?: PlantCategory
  onSelectCategory?: (category?: PlantCategory) => void
}

export default function CategoriesList({ selected, onSelectCategory = noop }: CategoriesListProps) {
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | undefined>(selected)
  const isSelected = useCallback(
    (category: PlantCategory) =>
      selectedCategory ? selectedCategory.guid === category.guid : false,
    [selectedCategory]
  )

  useEffect(() => {
    onSelectCategory(selectedCategory)
  }, [selectedCategory, onSelectCategory])

  return (
    <List>
      <li>
        <label htmlFor="type-empty">
          <Input
            type="radio"
            id="type-empty"
            name="type"
            value="empty"
            checked={selectedCategory === undefined || selectedCategory === null}
            onClick={() => setSelectedCategory(undefined)}
          />
          <Text
            color={
              selectedCategory === undefined || selectedCategory === null
                ? 'greenDark'
                : 'beigeDark'
            }
          >
            Leave empty
          </Text>
        </label>
      </li>
      {categoriesData.map((category) => (
        <li key={category.guid}>
          <label htmlFor={`type-${category.value}`}>
            <Input
              type="radio"
              id={`type-${category.value}`}
              name="type"
              value={category.value}
              checked={isSelected(category)}
              onClick={() => setSelectedCategory(category)}
            />
            <Text color={isSelected(category) ? 'greenDark' : 'beigeDark'}>{category.label}</Text>
          </label>
        </li>
      ))}
    </List>
  )
}
