import React, { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'react-feather'
import { theme } from 'theme'
import styled from 'styled-components'
import A11yDialogInstance from 'a11y-dialog'
import toast from 'react-hot-toast'
import Layout from 'components/Layout'
import TagList from 'components/TagList'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import VisuallyHidden from 'components/VisuallyHidden'
import { Text } from 'components/Typography'
import Spinner from 'components/Spinner'
import Dialog from 'components/Dialog'
import {
  addPlantTag,
  deletePlantTag,
  queryTagsFromPlants,
  updatePlant,
  updatePlantTag,
  usePlantTags,
} from 'services/firebase'
import useRouteConfig from 'utilities/useRouteConfig'
import useUserProfile from 'utilities/useUserProfile'
import toSlug from 'utilities/toSlug'
import logger from 'utilities/logger'
import { PlantTag } from 'typings/plant'

const Description = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.l};
  width: 100%;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.l};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacings.l};
`

export default function SettingsTags() {
  const routeConfig = useRouteConfig('settingsTags')
  const profile = useUserProfile()
  const [inputTagName, setInputTagName] = useState({ value: '', error: '' })
  const [inputEditTag, setInputEditTag] = useState({ value: '', error: '' })
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [tags, loading] = usePlantTags()
  const [selectedTag, setSelectedTag] = useState<PlantTag>()
  const [dialog, setDialog] = useState<A11yDialogInstance>()
  const [confirmDelete, setConfirmDelete] = useState(false)

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

  async function editTag() {
    if (inputEditTag?.value.trim() === '') {
      setInputEditTag((d) => ({ ...d, error: `Tag name can't be empty.` }))
      return
    }

    // Don't perform actions when content hasn't changed
    if (inputEditTag.value === selectedTag?.label) {
      return
    }

    setIsUploading(true)
    try {
      const name = inputEditTag.value.trim()
      const updatedData = {
        ...selectedTag,
        label: name,
        value: toSlug(name),
      } as PlantTag
      await updatePlantTag(profile.id, updatedData)
      toast.success('Tag successfully updated.')
    } catch (error) {
      logger(error as string, true)
      toast.error('Unable to update tag, please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  async function deleteTag() {
    if (confirmDelete === false) {
      setConfirmDelete(true)
      return
    }

    setIsDeleting(true)
    try {
      await deletePlantTag(profile.id, selectedTag!.id)

      // Remove tag reference from plants
      const queried = await queryTagsFromPlants(profile.id, selectedTag!.id)
      if (!queried.empty) {
        const cleanUpPlants = queried?.docs?.map((d) => d.data())
        for (const plant of cleanUpPlants) {
          try {
            await updatePlant(profile.id, {
              id: plant.id,
              tags: plant.tags?.filter((t) => t.id !== selectedTag!.id),
            })
          } catch (error) {
            logger(error as string, true)
          }
        }
      }

      setSelectedTag(undefined)
      toast.success('Tag deleted.')
      dialog?.hide()
    } catch (error) {
      logger(error as string, true)
      toast.error('Unable to delete tag, please try again.')
    } finally {
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  async function handleDialog(tag: PlantTag) {
    setSelectedTag(tag)
    setInputEditTag((d) => ({ ...d, value: tag.label }))
    dialog?.show()
  }

  function handleDialogClose() {
    setSelectedTag(undefined)
    setInputEditTag({ value: '', error: '' })
  }

  useEffect(() => {
    dialog?.on('hide', handleDialogClose)
    return () => {
      dialog?.off('hide', handleDialogClose)
    }
  }, [dialog])

  return (
    <Layout {...routeConfig}>
      {/* Dialog */}
      <Dialog id="tag-edit" title="Edit tag" reference={setDialog}>
        <Input
          fullWidth
          type="text"
          placeholder="Edit tag name"
          id="tags-edit"
          value={inputEditTag.value}
          error={inputEditTag.error}
          disabled={isUploading}
          onChange={(event) => setInputEditTag({ value: event.target.value, error: '' })}
        />
        <Actions>
          <Button variant="alarm" onClick={deleteTag}>
            {isDeleting ? <Spinner /> : <Trash2 />}
            {confirmDelete ? 'Are you sure?' : 'Delete tag'}
          </Button>
          <Button variant="normal" onClick={editTag}>
            {isUploading && <Spinner />}
            Save
          </Button>
        </Actions>
      </Dialog>

      {/* Page content */}
      <Description>
        <Text color="greenDark">Some description how tags can be used here.</Text>
      </Description>

      {loading ? (
        <Spinner />
      ) : tags?.length === 0 ? (
        <Text as="span" color="beigeDark">
          You dont have any tags created yet.
        </Text>
      ) : (
        <TagList tags={tags} onSelect={handleDialog} />
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
    </Layout>
  )
}
