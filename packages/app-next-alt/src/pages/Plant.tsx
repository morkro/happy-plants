import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import A11yDialogInstance from 'a11y-dialog'
import styled, { createGlobalStyle, css } from 'styled-components'
import { CameraOff, MoreVertical, Plus } from 'react-feather'
import { theme } from 'theme'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { Heading, Text } from 'components/Typography'
import { getFileRef, usePlantDocument, useUserDocument } from 'services/firebase'
import { toast } from 'components/Toaster'
import DocumentTitle from 'components/DocumentTitle'
import Spinner from 'components/Spinner'
import BaseSVG from 'components/BaseSVG'
import Dialog from 'components/Dialog'
import CategoriesList from 'components/CategoriesList'
import { AppHeaderPortal, AppHeaderButton } from 'components/AppHeader'
import VisuallyHidden from 'components/VisuallyHidden'
import { Button } from 'components/Button'
import Time from 'components/Time'
import { toLocaleDate } from 'utilities/toLocaleDate'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'
import TagsDialog from 'components/TagsDialog'
import { PlantTag } from 'typings/plant'
import TagList from 'components/TagList'

const PlantGlobalStyle = createGlobalStyle`
  #plant-dialog-settings .dialog-content > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const PlantHeader = styled.header<{ $loading: boolean }>`
  width: calc(100% + ${({ theme }) => theme.spacings.l});
  height: 100vw;
  background: ${({ theme }) => theme.colors.white};
  margin-top: -${(props) => props.theme.frameWidgetHeight};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  mask: url(../assets/plant-header-mask.svg);
  mask-size: cover;

  ${({ $loading }) =>
    $loading &&
    css`
      justify-content: center;
      align-items: center;

      &::before {
        content: '';
        width: 60%;
        height: 20px;
        display: block;
        background: ${({ theme }) => theme.colors.beige};
        border-radius: ${({ theme }) => theme.baseRadius};
        position: absolute;
        bottom: ${({ theme }) => theme.spacings.m};
        left: ${({ theme }) => theme.spacings.m};
      }
    `}

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const PlantHeaderLabel = styled.div<{ gradient: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacings.l};
  position: relative;
  z-index: 1;

  ${({ gradient }) =>
    gradient &&
    css`
      background-image: var(--top-notch-gradient);
    `}
`

const PlantHeaderBackground = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlantSection = styled.section`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacings.m};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacings.m};
  }
`

const CategoryAction = styled.button`
  background: transparent;
  border: none;
  position: relative;
  z-index: 0;
  padding: calc(0.5 * ${({ theme }) => theme.spacings.m}) ${({ theme }) => theme.spacings.m};

  &:focus,
  &:hover {
    outline: none;

    & svg path {
      fill: ${({ theme }) => theme.colors.yellow};
    }
  }

  p {
    position: relative;
    z-index: 1;
  }

  svg {
    height: 85%;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    & path {
      fill: ${({ theme }) => theme.colors.green};
    }
  }
`

export default function Plant() {
  const routeConfig = useRouteConfig('plantBase')
  const [userDoc, loadingUserDoc] = useUserDocument()
  const params = useParams<{ id: string }>()
  const [categoryDialog, setCategoryDialog] = useState<A11yDialogInstance>()
  const [tagsDialog, setTagsDialog] = useState<A11yDialogInstance>()
  const [modulesDialog, setModulesDialog] = useState<A11yDialogInstance>()
  const [settingsDialog, setSettingsDialog] = useState<A11yDialogInstance>()
  const [selectedTags, setSelectedTags] = useState<PlantTag[]>([])
  const [data, loading, error] = usePlantDocument(params.id ?? '')
  const [downloadedImageUrl, loadingImageUrl] = useDownloadURL(getFileRef(data?.imageURL as string))
  const hasImageUrl = typeof data?.imageURL === 'string'

  useEffect(() => console.log(data), [data])

  useEffect(() => {
    console.log(selectedTags)
  }, [selectedTags])

  useEffect(() => {
    if (error !== undefined) {
      toast.error(error?.message || 'Failed to load your data. Please reload.')
    }
  }, [error])

  return (
    <Layout {...routeConfig}>
      {/* Globals */}
      <PlantGlobalStyle />
      <DocumentTitle title={data?.name} />

      {/* Dialogs */}
      <Dialog title="Settings" reference={setSettingsDialog} id="plant-dialog-settings">
        <Button variant="alarm" mb="l" mt="s">
          Delete plant
        </Button>
        {data?.modified && (
          <Text color="beigeDark" size="s" center>
            Last modified {toLocaleDate(data?.modified)} (
            <Time dateTime={data?.modified}>{data?.modified}</Time>)
          </Text>
        )}
      </Dialog>

      <Dialog title="Select a category" reference={setCategoryDialog} id="plant-dialog-category">
        {!loading && (
          <CategoriesList
            selected={data?.type ?? undefined}
            onSelectCategory={(c) => console.log(c)}
          />
        )}
      </Dialog>

      <TagsDialog
        id="plant-dialog-tags"
        reference={setTagsDialog}
        tags={userDoc?.tags}
        loading={loadingUserDoc}
        selected={selectedTags}
        onSelect={setSelectedTags}
      />

      <Dialog title="Select modules" reference={setModulesDialog} id="plant-dialog-modules">
        <Text color="beigeDark">There are no modules.</Text>
      </Dialog>

      {/* Page content */}
      <AppHeaderPortal.Source>
        <AppHeaderButton onClick={() => settingsDialog?.show()}>
          <MoreVertical color={theme.colors.greenDark} aria-hidden="true" focusable="false" />
          <VisuallyHidden>Settings</VisuallyHidden>
        </AppHeaderButton>
      </AppHeaderPortal.Source>

      <PlantHeader $loading={loading}>
        {!loading && (
          <PlantHeaderLabel gradient={hasImageUrl && !loadingImageUrl}>
            <Heading
              semiBold
              color={hasImageUrl && !loadingImageUrl ? 'white' : 'greenDark'}
              as="h2"
            >
              {data?.name}
            </Heading>
          </PlantHeaderLabel>
        )}

        <PlantHeaderBackground>
          {loading && <Spinner />}
          {!loading && data && hasImageUrl && !loadingImageUrl ? (
            <img loading="lazy" src={downloadedImageUrl} alt={data.name} title={data.name} />
          ) : (
            <CameraOff color={theme.colors.beige} size={80} />
          )}
        </PlantHeaderBackground>
      </PlantHeader>

      <PlantSection>
        <header>
          <Text bold color="beigeDark" mt="m">
            Category
          </Text>
          <CategoryAction onClick={() => categoryDialog?.show()}>
            <Text color="white">{data?.type?.label ?? 'No type'}</Text>
            <BaseSVG viewBox="0 0 165 30" preserveAspectRatio="none" role="presentation">
              <path
                fillRule="evenodd"
                fill={theme.colors.green}
                d="M15.2980242 1.6865913C54.3474655-.0040447 142.277064-1.0595373 158.333369 1.687221c3.375937.5775946 5.502516 1.7986084 5.918387 3.8707842 1.21636 6.106668 1.016982 12.190389-1.095662 18.3021319-1.949603 5.6402323-10.579788 5.712085-23.246595 5.8007791C1.8856749 30.6329676 1.9064585 29.5996066.7651242 25.4596764c-.4861923-1.7819255-.903879-3.6105191-.7214437-5.4103613C1.9143985 2.0020504 4.40911 2.1588096 15.2980242 1.6865913"
              />
            </BaseSVG>
          </CategoryAction>
        </header>
      </PlantSection>

      <PlantSection>
        <header>
          <Text bold color="beigeDark">
            Tags
          </Text>
          <Button round size="s" variant="info" onClick={() => tagsDialog?.show()}>
            <Plus color={theme.colors.white} aria-hidden="true" focusable="false" />
            <VisuallyHidden>Open tags dialog</VisuallyHidden>
          </Button>
        </header>
        {selectedTags?.length ? (
          <TagList tags={selectedTags} />
        ) : (
          <Text color="beigeDark">Add tags for better organisation</Text>
        )}
      </PlantSection>

      <PlantSection>
        <header>
          <Text bold color="beigeDark">
            Modules
          </Text>
          <Button round size="s" variant="info" onClick={() => modulesDialog?.show()}>
            <Plus color={theme.colors.white} aria-hidden="true" focusable="false" />
            <VisuallyHidden>Open modules dialog</VisuallyHidden>
          </Button>
        </header>
        <Text color="beigeDark">Add modules for interactive care taking</Text>
      </PlantSection>
    </Layout>
  )
}
