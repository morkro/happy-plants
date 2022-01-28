import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { List, Plus } from 'react-feather'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import A11yDialogInstance from 'a11y-dialog'
import { theme } from 'theme'
import Layout, { BaseLayout } from 'components/Layout'
import NewIllustration from 'components/NewIllustration'
import { Button } from 'components/Button'
import { Text } from 'components/Typography'
import { Input } from 'components/Input'
import Spinner from 'components/Spinner'
import VisuallyHidden from 'components/VisuallyHidden'
import Dialog from 'components/Dialog'
import CategoriesList from 'components/CategoriesList'
import { PlantCategory, PlantTag } from 'typings/plant'
import { getUserDoc } from 'services/firebase'
import useUserInfo from 'utilities/useUserInfo'
import Tag from 'components/Tag'
import useRouteConfig from 'utilities/useRouteConfig'

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

const NewPlantButton = styled(Button)`
  box-shadow: 0 1px 2px ${({ theme }) => theme.colors.greenDark};
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spacings.m};
`

const CategoryButton = styled.button`
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

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -${({ theme }) => theme.spacings.l};

  li {
    margin-right: ${({ theme }) => theme.spacings.m};
    margin-bottom: ${({ theme }) => theme.spacings.m};
  }
`

export default function New() {
  const routeConfig = useRouteConfig('new')
  const userInfo = useUserInfo()
  const [tagsDialog, setTagsDialog] = useState<A11yDialogInstance>()
  const [categoriesDialog, setCategoriesDialog] = useState<A11yDialogInstance>()
  const [name, setName] = useState({ value: '', error: '' })
  const [photo, setPhoto] = useState({ value: '', error: '' })
  const [category, setCategory] = useState<PlantCategory | null | undefined>(undefined)
  const [selectedTags, setSelectedTags] = useState<PlantTag[]>([])
  const [isProgress, setIsProgress] = useState(false)
  const [userDoc, loadingUserDoc] = useDocumentData(getUserDoc(userInfo.id))

  function formAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsProgress(true)
  }

  function toggleTagSelection(tag: PlantTag) {
    if (selectedTags.some((t) => t.guid === tag.guid)) {
      setSelectedTags(selectedTags.filter((t) => t.guid !== tag.guid))
    } else {
      setSelectedTags((t) => [...t, tag])
    }
  }

  useEffect(() => {
    console.log('name =>', name)
    console.log('photo =>', photo)
    console.log('category =>', category)
    console.log('isProgress =>', isProgress)
  }, [name, photo, category, isProgress])

  useEffect(() => {
    console.log(selectedTags)
  }, [selectedTags])

  return (
    <Layout {...routeConfig}>
      <NewGlobalStyle />

      <Dialog id="newplant-tags" title="Add tags" reference={setTagsDialog}>
        {!loadingUserDoc && (
          <TagList>
            {userDoc?.tags?.map((tag) => (
              <li key={tag.label + tag.guid}>
                <Tag
                  active={selectedTags.some((t) => t.guid === tag.guid)}
                  onClick={() => toggleTagSelection(tag)}
                >
                  {tag.label}
                </Tag>
              </li>
            ))}
          </TagList>
        )}
        <label htmlFor="tags-create">
          <Input fullWidth type="text" placeholder="Create new" id="tags-create" />
          <Button>
            <VisuallyHidden>Create</VisuallyHidden>
            <Plus color={theme.colors.white} />
          </Button>
        </label>
      </Dialog>

      <Dialog id="newplant-categories" title="Select a category" reference={setCategoriesDialog}>
        <CategoriesList onSelectCategory={(category) => setCategory(category)} />
      </Dialog>

      <NewForm onSubmit={formAction}>
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
            data-cy="new-form-name"
            onChange={(event) => setName((d) => ({ ...d, value: event.target.value }))}
          />
        </label>

        <label htmlFor="photo">
          <Text color="white" mb="m" as="span">
            Do you want to upload a photo?
          </Text>
          <Input
            required
            fullWidth
            type="file"
            value={photo.value}
            id="photo"
            error={photo.error}
            data-cy="new-form-photo"
            fileBackgroundColor="greenDark"
            onChange={(event) => setPhoto((d) => ({ ...d, value: event.target.value }))}
          />
        </label>

        <label htmlFor="category">
          <Text color="white" mb="m" as="span">
            Category
          </Text>
          <CategoryButton onClick={() => categoriesDialog?.show()}>
            <div>
              <Text color="beigeDark" as="span" variant="special">
                {category ? category.label : 'e.g. Succulent, Herb, …'}
              </Text>
            </div>
            <div>
              <List />
            </div>
          </CategoryButton>
        </label>

        <label htmlFor="tags">
          <Text color="white" mb="m" as="span">
            Tags
          </Text>
          {selectedTags?.length ? (
            <TagList onClick={() => tagsDialog?.show()}>
              {selectedTags?.map((tag) => (
                <li key={tag.guid}>
                  <Tag>{tag.label}</Tag>
                </li>
              ))}
            </TagList>
          ) : (
            <div>
              <Button round size="s" variant="warning" onClick={() => tagsDialog?.show()}>
                <Plus color={theme.colors.greenDark} />
                <VisuallyHidden>Open tags dialog</VisuallyHidden>
              </Button>
              <Text color="white">Add tags for more granular organisation</Text>
            </div>
          )}
        </label>

        <NewPlantButton type="submit" variant="warning">
          {isProgress && <Spinner />}
          Add friend
        </NewPlantButton>
      </NewForm>

      <Illustration />
    </Layout>
  )
}
