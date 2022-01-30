import React, { useEffect, useState } from 'react'
import { Plus } from 'react-feather'
import styled from 'styled-components'
import A11yDialogInstance from 'a11y-dialog'
import { theme } from 'theme'
import { PlantTag } from 'typings/plant'
import noop from 'utilities/noop'
import useUserProfile from 'utilities/useUserProfile'
import toSlug from 'utilities/toSlug'
import logger from 'utilities/logger'
import { addPlantTag } from 'services/firebase'
import VisuallyHidden from './VisuallyHidden'
import { Button } from './Button'
import Dialog from './Dialog'
import { Input } from './Input'
import TagList from './TagList'
import { Text } from './Typography'
import Spinner from './Spinner'
import { toast } from './Toaster'

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.m};
  align-items: center;
  margin-top: ${({ theme }) => theme.spacings.l};
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
  const profile = useUserProfile()
  const [selectedTags, setSelected] = useState<PlantTag[]>(selected)
  const [inputTagName, setInputTagName] = useState({ value: '', error: '' })
  const [isUploading, setIsUploading] = useState(false)

  function toggleTagSelection(tag: PlantTag) {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelected(selectedTags.filter((t) => t.id !== tag.id))
    } else {
      setSelected((t) => [...t, tag])
    }
  }

  async function addNewTag() {
    if (inputTagName.value.trim() === '') {
      setInputTagName((d) => ({ ...d, error: `Tag name can't be empty.` }))
      return
    }

    setIsUploading(true)
    try {
      const name = inputTagName.value.trim()
      const partialData = { label: name, value: toSlug(name) }
      await addPlantTag(profile.id, partialData)
      toast.success('Tag successfully created.')
    } catch (error) {
      logger(error as string, true)
      toast.error('An error occured creating your tag, please try again')
    } finally {
      setIsUploading(false)
      setInputTagName({ value: '', error: '' })
    }
  }

  useEffect(() => {
    onSelect(selectedTags)
  }, [onSelect, selectedTags])

  return (
    <Dialog id={id} title="Manage tags" reference={reference}>
      {loading ? (
        <Spinner />
      ) : tags.length ? (
        <TagList tags={tags} selected={selectedTags} onSelect={toggleTagSelection} />
      ) : (
        <Text color="greenDark">{`You haven't created any tags yet.`}</Text>
      )}
      <Actions>
        <Input
          fullWidth
          type="text"
          placeholder="Create new tag"
          id="tags-create"
          value={inputTagName.value}
          error={inputTagName.error}
          disabled={isUploading}
          onChange={(event) => setInputTagName({ value: event.target.value, error: '' })}
        />
        <Button round onClick={addNewTag}>
          <VisuallyHidden>Create new tag</VisuallyHidden>
          {isUploading ? <Spinner /> : <Plus color={theme.colors.white} />}
        </Button>
      </Actions>
    </Dialog>
  )
}
