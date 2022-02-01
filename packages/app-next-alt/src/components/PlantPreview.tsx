import React from 'react'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { CameraOff } from 'react-feather'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { theme } from 'theme'
import { getFileRef } from 'services/firebase'
import Spinner from './Spinner'
import { Text } from './Typography'

export interface PlantProps {
  imageUrl?: string | null
  href?: string
  loading?: boolean
  name?: string
  size?: 'm' | 'l'
}

const PlantContainer = styled.div<{ $loading: boolean }>`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.baseRadius};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};

  ${({ $loading }) =>
    $loading &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &::before,
      &::after {
        content: '';
        width: calc(100% - 1.5 * ${({ theme }) => theme.spacings.m});
        height: 16px;
        display: block;
        background: ${({ theme }) => theme.colors.beige};
        border-radius: ${({ theme }) => theme.baseRadius};
        position: absolute;
        bottom: calc(0.5 * ${({ theme }) => theme.spacings.m});
        left: calc(0.75 * ${({ theme }) => theme.spacings.m});
      }

      &::after {
        width: 40%;
        transform: translateY(calc(-100% - 0.5 * ${({ theme }) => theme.spacings.m}));
      }
    }
  `}
`

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  align-items: flex-end;
  text-decoration: none;
`

const Label = styled.div<{ gradient: boolean }>`
  text-align: left;
  padding: ${({ theme }) => theme.spacings.m};
  position: relative;
  z-index: 1;
  width: 100%;

  ${({ gradient }) =>
    gradient &&
    css`
      background-image: var(--top-notch-gradient);
    `}
`

const Background = styled.div`
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function PlantPreview(props: PlantProps) {
  const { loading = true, href = '', name, imageUrl } = props
  const hasImageUrl = typeof imageUrl === 'string'
  const imageRef = getFileRef(imageUrl === null ? undefined : imageUrl)
  const [downloadedImageUrl, loadingImageUrl] = useDownloadURL(imageRef)

  return (
    <PlantContainer $loading={loading}>
      {loading ? (
        <Spinner color={theme.colors.beigeDark} size={45} />
      ) : (
        <StyledLink to={href}>
          <Label gradient={hasImageUrl}>
            <Text color={hasImageUrl ? 'white' : 'greenDark'}>{name}</Text>
          </Label>
          <Background>
            {hasImageUrl && !loadingImageUrl ? (
              <img loading="lazy" src={downloadedImageUrl} alt={name} title={name} />
            ) : (
              <CameraOff color={theme.colors.beige} size={45} />
            )}
          </Background>
        </StyledLink>
      )}
    </PlantContainer>
  )
}
