import React, { useEffect, useState } from 'react'
import { Plus } from 'react-feather'
import styled from 'styled-components'
import A11yDialogInstance from 'a11y-dialog'
import { theme } from 'theme'
import { PlantTag } from 'typings/plant'
import noop from 'utilities/noop'
import VisuallyHidden from './VisuallyHidden'
import { Button } from './Button'
import Dialog from './Dialog'
import { Input } from './Input'
import TagList from './TagList'

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.m};
  align-items: center;
  margin-top: ${({ theme }) => theme.spacings.l};

  div {
    width: 100%;
  }
`

interface TagsDialogProps {
  id: string
  tags?: PlantTag[]
  loading: boolean
  onSelect: (tags: PlantTag[]) => void
  selected: PlantTag[]
  reference: React.Dispatch<React.SetStateAction<A11yDialogInstance | undefined>>
}

export default function TagsDialog(props: TagsDialogProps) {
  const { id, tags = [], loading, onSelect = noop, selected = [], reference } = props
  const [selectedTags, setSelected] = useState<PlantTag[]>(selected)

  function toggleTagSelection(tag: PlantTag) {
    if (selectedTags.some((t) => t.guid === tag.guid)) {
      setSelected(selectedTags.filter((t) => t.guid !== tag.guid))
    } else {
      setSelected((t) => [...t, tag])
    }
  }

  useEffect(() => {
    onSelect(selectedTags)
  }, [onSelect, selectedTags])

  return (
    <Dialog id={id} title="Manage tags" reference={reference}>
      {!loading && <TagList tags={tags} selected={selectedTags} onSelect={toggleTagSelection} />}
      <Actions>
        <Input fullWidth type="text" placeholder="Create new" id="tags-create" />
        <Button round>
          <VisuallyHidden>Create tag</VisuallyHidden>
          <Plus color={theme.colors.white} />
        </Button>
      </Actions>
    </Dialog>
  )
}
