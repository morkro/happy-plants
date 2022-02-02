import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { List, Plus } from 'react-feather'
import A11yDialogInstance from 'a11y-dialog'
import { theme } from 'theme'
import { generatePath, useNavigate } from 'react-router-dom'
import { routePaths } from 'routes'
import { getDownloadURL } from 'firebase/storage'
import Layout, { BaseLayout } from 'components/Layout'
import NewIllustration from 'components/NewIllustration'
import { Button } from 'components/Button'
import { Text } from 'components/Typography'
import { Input } from 'components/Input'
import Spinner from 'components/Spinner'
import VisuallyHidden from 'components/VisuallyHidden'
import Dialog from 'components/Dialog'
import TypesList from 'components/TypesList'
import TagsDialog from 'components/TagsDialog'
import TagList from 'components/TagList'
import { toast } from 'components/Toaster'
import { addPlant, getTagRef, updatePlant, uploadPhoto, usePlantTags } from 'services/firebase'
import { PlantType, PlantTag } from 'typings/plant'
import useRouteConfig from 'utilities/useRouteConfig'
import logger from 'utilities/logger'
import useUserProfile from 'utilities/useUserProfile'

const NewGlobalStyle = createGlobalStyle`
  #root ${BaseLayout} {
    background-color: ${({ theme }) => theme.colors.green};
  }
`

const Illustration = styled(NewIllustration)`
  width: 100%;
  position: absolute;
  z-index: 0;
  bottom: 0;
`

const NewForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  label {
    text-align: left;
    position: relative;
    margin-bottom: ${({ theme }) => theme.spacings.l};
  }
`

const NewPlantButton = styled((p) => <Button {...p} />)`
  box-shadow: 0 1px 2px ${({ theme }) => theme.colors.greenDark};
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spacings.m};
`

const TypeButton = styled.button`
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.baseRadius};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: stretch;
  overflow: hidden;

  & div:first-of-type {
    width: 100%;
    display: flex;
    align-items: center;
    padding: calc(${({ theme }) => theme.spacings.m} * 2);
    border: 2px solid ${({ theme }) => theme.colors.white};
    border-top-left-radius: ${({ theme }) => theme.baseRadius};
    border-bottom-left-radius: ${({ theme }) => theme.baseRadius};
    border-right: none;
    background: ${({ theme }) => theme.colors.white};
  }

  & div:first-of-type + div {
    background: ${({ theme }) => theme.colors.yellow};
    border: 2px solid ${({ theme }) => theme.colors.yellow};
    border-top-right-radius: ${({ theme }) => theme.baseRadius};
    border-bottom-right-radius: ${({ theme }) => theme.baseRadius};
    border-left: none;
    padding: 0 calc(${({ theme }) => theme.spacings.m} * 2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const TagContainer = styled.div<{ hasContent: boolean }>`
  display: flex;
  align-items: ${({ hasContent }) => (hasContent ? 'start' : 'center')};
  gap: ${({ theme }) => theme.spacings.m};
`

export default function PlantNew() {
  const routeConfig = useRouteConfig('plantNew')
  const profile = useUserProfile()
  const [tags, loadingTags] = usePlantTags()
  const navigate = useNavigate()
  const [tagsDialog, setTagsDialog] = useState<A11yDialogInstance>()
  const [categoriesDialog, setCategoriesDialog] = useState<A11yDialogInstance>()
  const [name, setName] = useState({ value: '', error: '' })
  const [photo, setPhoto] = useState<File>()
  const [type, setType] = useState<PlantType>()
  const [selectedTags, setSelectedTags] = useState<PlantTag[]>([])
  const [isProgress, setIsProgress] = useState(false)

  function onSelecttype(type?: PlantType) {
    setType(type)
  }

  function onFileInput(data: { file?: File; fileName: string }) {
    if (data.file) {
      setPhoto(data.file)
    }
  }

  async function formAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsProgress(true)

    try {
      const ref = await addPlant(profile.id, {
        name: name.value.trim(),
        type: type,
        tags: selectedTags?.map((tag) => getTagRef(profile.id, tag.id)),
      })

      if (photo) {
        const upload = await uploadPhoto(profile.id, ref.id, photo)
        if (upload) {
          const url = await getDownloadURL(upload.ref)
          await updatePlant(profile.id, {
            id: ref.id,
            imageURL: url,
          })
        }
      }

      navigate(generatePath(routePaths.plant.base, { id: ref.id }))
    } catch (error) {
      logger(error as string, true)
      toast.error('An error oc  cured adding your new plant, please try again')
    } finally {
      setIsProgress(false)
    }
  }

  return (
    <React.Fragment>
      {/* Globals */}
      <NewGlobalStyle />
      <Layout {...routeConfig}>
        {/* Dialogs */}
        <TagsDialog
          id="newplant-tags"
          reference={setTagsDialog}
          tags={tags}
          loading={loadingTags}
          selected={selectedTags}
          onSelect={setSelectedTags}
        />

        <Dialog id="newplant-categories" title="Select a type" reference={setCategoriesDialog}>
          <TypesList onSelectType={onSelecttype} />
        </Dialog>

        {/* Page content */}
        <NewForm>
          <label htmlFor="name">
            <Text color="white" mb="m" as="span">
              What&apos;s your friends name?
              <span title="Required">
                {'*'}
                <VisuallyHidden>(required)</VisuallyHidden>
              </span>
            </Text>
            <Input
              required
              fullWidth
              type="name"
              value={name.value}
              placeholder="Echeveria pulvinata"
              id="name"
              error={name.error}
              disabled={isProgress}
              data-cy="new-form-name"
              onChange={(event) => {
                setName((d) => ({ ...d, value: event.target.value }))
              }}
            />
          </label>

          <label htmlFor="photo">
            <Text color="white" mb="m" as="span">
              Do you want to upload a photo?
            </Text>
            <Input
              fullWidth
              type="file"
              id="photo"
              data-cy="new-form-photo"
              disabled={isProgress}
              fileBackgroundColor="greenDark"
              onFileInput={onFileInput}
            />
          </label>

          <label htmlFor="type">
            <Text color="white" mb="m" as="span">
              Type
            </Text>
            <TypeButton type="button" onClick={() => !isProgress && categoriesDialog?.show()}>
              <div>
                <Text
                  color={type !== undefined ? 'black' : 'beigeDark'}
                  as="span"
                  variant="special"
                >
                  {type !== undefined ? type.label : 'e.g. Succulent, Herb, …'}
                </Text>
              </div>
              <div>
                <List />
              </div>
            </TypeButton>
          </label>

          <label htmlFor="tags">
            <Text color="white" mb="m" as="span">
              Tags
            </Text>
            <TagContainer hasContent={selectedTags?.length > 0}>
              <Button
                round
                size="s"
                variant="warning"
                type="button"
                onClick={() => !isProgress && tagsDialog?.show()}
              >
                <Plus color={theme.colors.greenDark} />
                <VisuallyHidden>Open tags dialog</VisuallyHidden>
              </Button>
              {selectedTags?.length ? (
                <TagList tags={selectedTags} />
              ) : (
                <Text color="white">Add tags for more granular organisation</Text>
              )}
            </TagContainer>
          </label>

          <NewPlantButton type="submit" variant="warning" onClick={formAction}>
            {isProgress && <Spinner />}
            Add friend
          </NewPlantButton>
        </NewForm>

        {/* Background */}
        <Illustration />
      </Layout>
    </React.Fragment>
  )
}
