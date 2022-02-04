import React from 'react'
import styled from 'styled-components'
import { PlantTag } from 'typings/plant'
import noop from 'utilities/noop'
import Tag from './Tag'

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: ${({ theme }) => theme.spacings.m};
`

interface TagListProps {
  tags?: PlantTag[]
  selected?: PlantTag[]
  onSelect?: (tag: PlantTag) => void
}

export default function TagList(props: TagListProps) {
  const { tags = [], selected = [], onSelect = noop } = props

  return (
    <List>
      {tags.map((tag) => (
        <li key={tag.label + tag.id}>
          <Tag active={selected.some((t) => t.id === tag.id)} onClick={() => onSelect(tag)}>
            {tag.label}
          </Tag>
        </li>
      ))}
    </List>
  )
}
