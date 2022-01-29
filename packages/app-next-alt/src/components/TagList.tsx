import React from 'react'
import styled from 'styled-components'
import { PlantTag } from 'typings/plant'
import noop from 'utilities/noop'
import Tag from './Tag'

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -${({ theme }) => theme.spacings.l};

  li {
    margin-right: ${({ theme }) => theme.spacings.m};
    margin-bottom: ${({ theme }) => theme.spacings.m};
  }
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
        <li key={tag.label + tag.guid}>
          <Tag active={selected.some((t) => t.guid === tag.guid)} onClick={() => onSelect(tag)}>
            {tag.label}
          </Tag>
        </li>
      ))}
    </List>
  )
}
