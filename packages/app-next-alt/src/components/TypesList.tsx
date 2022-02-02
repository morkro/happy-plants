import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import typesData from 'data/types'
import { PlantType } from 'typings/plant'
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

export interface TypesListProps {
  selected?: PlantType
  onSelectType?: (type?: PlantType) => void
}

export default function TypesList({ selected, onSelectType = noop }: TypesListProps) {
  const [selectedType, setSelectedType] = useState<PlantType | undefined>(selected)
  const isSelected = useCallback(
    (type: PlantType) => (selectedType ? selectedType.id === type.id : false),
    [selectedType]
  )

  useEffect(() => {
    if (selected?.id !== selectedType?.id) {
      setSelectedType(selectedType)
      onSelectType(selectedType)
    }
  }, [selected, selectedType, onSelectType])

  return (
    <List>
      <li>
        <label htmlFor="type-empty">
          <Input
            type="radio"
            id="type-empty"
            name="type"
            value="empty"
            checked={selectedType === undefined}
            onClick={() => setSelectedType(undefined)}
          />
          <Text color={selectedType === undefined ? 'greenDark' : 'beigeDark'}>Leave empty</Text>
        </label>
      </li>
      {typesData.map((type) => (
        <li key={type.id}>
          <label htmlFor={`type-${type.value}`}>
            <Input
              type="radio"
              id={`type-${type.value}`}
              name="type"
              value={type.value}
              checked={isSelected(type)}
              onClick={() => setSelectedType(type)}
            />
            <Text color={isSelected(type) ? 'greenDark' : 'beigeDark'}>{type.label}</Text>
          </label>
        </li>
      ))}
    </List>
  )
}
