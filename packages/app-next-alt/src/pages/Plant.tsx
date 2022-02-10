import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import A11yDialogInstance from 'a11y-dialog'
import styled, { createGlobalStyle, css } from 'styled-components'
import { Camera, CameraOff, MoreVertical, Plus, Trash2 } from 'react-feather'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { theme } from 'theme'
import { routePaths } from 'routes'
import {
  deletePhoto,
  deletePlant,
  getFileRef,
  getTagDocs,
  getTagRef,
  updatePlant,
  updatePlantType,
  usePlantDocument,
  usePlantTags,
} from 'services/firebase'
import { Heading, Text } from 'components/Typography'
import { toast } from 'components/Toaster'
import DocumentTitle from 'components/DocumentTitle'
import Spinner from 'components/Spinner'
import BaseSVG from 'components/BaseSVG'
import Dialog from 'components/Dialog'
import TypesList from 'components/TypesList'
import { AppHeaderPortal } from 'components/AppHeader'
import VisuallyHidden from 'components/VisuallyHidden'
import { Button } from 'components/Button'
import Time from 'components/Time'
import Layout from 'components/Layout'
import TagsDialog from 'components/TagsDialog'
import TagList from 'components/TagList'
import { toLocaleDate } from 'utilities/toLocaleDate'
import useRouteConfig from 'utilities/useRouteConfig'
import { PlantTag, PlantType } from 'typings/plant'
import useUserProfile from 'utilities/useUserProfile'
import logger from 'utilities/logger'

const PlantGlobalStyle = createGlobalStyle`
  #plant-dialog-settings .dialog-content > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const SettingsButton = styled(Button)`
  margin-right: ${({ theme }) => `calc(1.25 * ${theme.spacings.m})`};
`

const PlantHeader = styled.header<{ $loading: boolean }>`
  width: calc(100% + calc(1.25 * ${({ theme }) => theme.spacings.l}));
  height: 100vw;
  background: ${({ theme }) => theme.colors.white};
  margin-top: -${(props) => props.theme.frameWidgetHeight};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  mask: url(../assets/img/plant-header-mask.svg);
  mask-size: cover;

  @media screen and (min-width: 650px) {
    height: auto;
    aspect-ratio: 1/1;
  }

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

const PlantHeaderUploadInfo = styled.div<{ showUploadLayer: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.m};
  opacity: ${({ showUploadLayer }) => (showUploadLayer ? '1' : '0')};
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.large};
  transition: opacity var(--base-transition) ease-in-out;
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

const TagsDescription = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s};
  color: ${({ theme }) => theme.colors.beigeDark};
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

  > svg {
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
  const profile = useUserProfile()
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [tags, loadingTags] = usePlantTags()
  const [data, loading, error] = usePlantDocument(params.id ?? '')
  const [downloadedImageUrl, loadingImageUrl] = useDownloadURL(getFileRef(data?.imageURL))
  const [typeDialog, setTypeDialog] = useState<A11yDialogInstance>()
  const [tagsDialog, setTagsDialog] = useState<A11yDialogInstance>()
  const [modulesDialog, setModulesDialog] = useState<A11yDialogInstance>()
  const [settingsDialog, setSettingsDialog] = useState<A11yDialogInstance>()
  const [selectedTags, setSelectedTags] = useState<PlantTag[]>([])
  const [isLoadingSelectedTags, setIsLoadingSelectedTags] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmPhotoUpload, setConfirmPhotoUpload] = useState(false)
  const hasImageUrl = typeof data?.imageURL === 'string'

  async function onSetPlantType(type?: PlantType) {
    try {
      await updatePlantType(profile.id, {
        id: data?.id,
        type: type,
      })
    } catch (error) {
      logger(error as string, true)
      toast.error('Failed to update plant type, please try again.')
    }
  }

  async function onDeletePlant() {
    if (!data) return
    if (confirmDelete === false) {
      setConfirmDelete(true)
      return
    }

    setIsDeleting(true)
    try {
      await deletePlant(profile.id, data.id)
      if (hasImageUrl) {
        const hasLegacyName = data?.imageURL?.includes('cover.png')
        await deletePhoto(profile.id, data?.id, hasLegacyName ? 'cover.png' : 'cover')
      }
    } catch (error) {
      logger(error as string, true)
      toast.error('Unable to delete plant, please try again.')
    } finally {
      setIsDeleting(false)
      setConfirmDelete(false)
      navigate(routePaths.home)
    }
  }

  function handleSettingsDialogClose() {
    setConfirmDelete(false)
  }

  function onHandlePhotoUpload() {
    if (!confirmPhotoUpload) {
      setConfirmPhotoUpload(true)

      setTimeout(() => {
        setConfirmPhotoUpload(false)
      }, 3000)

      return
    }

    console.log('upload new photo')
  }

  useEffect(() => {
    async function updateTags() {
      try {
        await updatePlant(profile.id, {
          id: data?.id,
          tags: selectedTags?.map((tag) => getTagRef(profile.id, tag.id)),
        })
      } catch (error) {
        logger(error as string, true)
        toast.error('Failed to update tags, please try again.')
      }
    }
    updateTags()
  }, [selectedTags, profile.id, data?.id])

  useEffect(() => {
    async function get() {
      if (!data?.tags?.length) {
        return
      }
      setIsLoadingSelectedTags(true)
      const tags = await getTagDocs(data?.tags)
      if (tags?.length) {
        setSelectedTags(tags)
      }
      setIsLoadingSelectedTags(false)
    }
    get()
  }, [data?.tags])

  useEffect(() => {
    if (error !== undefined) {
      toast.error(error?.message || 'Failed to load your data. Please reload.')
    }
  }, [error])

  useEffect(() => {
    settingsDialog?.on('hide', handleSettingsDialogClose)
    return () => {
      settingsDialog?.off('hide', handleSettingsDialogClose)
    }
  }, [settingsDialog])

  return (
    <React.Fragment>
      {/* Globals */}
      <PlantGlobalStyle />
      <DocumentTitle title={data?.name} />

      {/* Dialogs */}
      <Dialog title="Plant settings" reference={setSettingsDialog} id="plant-dialog-settings">
        <Button color="red" mb="l" mt="s" onClick={onDeletePlant}>
          {isDeleting ? <Spinner /> : <Trash2 />}
          {confirmDelete ? 'Are you sure? This is permanent' : 'Delete plant'}
        </Button>
        {data?.modified && (
          <Text color="beigeDark" size="s" center>
            Last modified {toLocaleDate(data?.modified)} (
            <Time dateTime={data?.modified}>{data?.modified}</Time>)
          </Text>
        )}
      </Dialog>

      <Dialog title="Select a category" reference={setTypeDialog} id="plant-dialog-category">
        {!loading && <TypesList selected={data?.type} onSelectType={onSetPlantType} />}
      </Dialog>

      <TagsDialog
        id="plant-dialog-tags"
        reference={setTagsDialog}
        tags={tags}
        loading={loadingTags}
        selected={selectedTags}
        onSelect={setSelectedTags}
      />

      <Dialog title="Select modules" reference={setModulesDialog} id="plant-dialog-modules">
        <Text color="beigeDark">There are no modules.</Text>
      </Dialog>

      {/* Page content */}
      <Layout {...routeConfig}>
        <AppHeaderPortal.Source>
          <SettingsButton
            round
            size="s"
            color="white"
            shadow={false}
            onClick={() => settingsDialog?.show()}
          >
            <MoreVertical color={theme.colors.greenDark} aria-hidden="true" focusable="false" />
            <VisuallyHidden>Plant settings</VisuallyHidden>
          </SettingsButton>
        </AppHeaderPortal.Source>

        <PlantHeader $loading={loading} onClick={onHandlePhotoUpload}>
          <PlantHeaderUploadInfo showUploadLayer={confirmPhotoUpload} aria-hidden="true">
            <Camera color="white" />
            <Text color="white" size="m" semiBold>
              Upload new photo
            </Text>
          </PlantHeaderUploadInfo>

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
              Type
            </Text>
            <CategoryAction onClick={() => typeDialog?.show()}>
              <Text color="white">{loading ? <Spinner /> : data?.type?.label ?? 'No type'}</Text>
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
            <Button round size="s" color="blue" onClick={() => tagsDialog?.show()}>
              <Plus color={theme.colors.white} aria-hidden="true" focusable="false" />
              <VisuallyHidden>Open tags dialog</VisuallyHidden>
            </Button>
          </header>
          {selectedTags?.length ? (
            <TagList tags={selectedTags} />
          ) : (
            <TagsDescription>
              {isLoadingSelectedTags ? <Spinner /> : null}
              <Text color="beigeDark">Add tags for better organisation</Text>
            </TagsDescription>
          )}
        </PlantSection>

        <PlantSection>
          <header>
            <Text bold color="beigeDark">
              Modules
            </Text>
            <Button round size="s" color="blue" onClick={() => modulesDialog?.show()}>
              <Plus color={theme.colors.white} aria-hidden="true" focusable="false" />
              <VisuallyHidden>Open modules dialog</VisuallyHidden>
            </Button>
          </header>
          <Text color="beigeDark">Add modules for interactive care taking</Text>
        </PlantSection>
      </Layout>
    </React.Fragment>
  )
}
