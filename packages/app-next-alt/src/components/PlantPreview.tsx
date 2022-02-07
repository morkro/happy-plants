import React from 'react'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { CameraOff } from 'react-feather'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { theme } from 'theme'
import { getFileRef } from 'services/firebase'
import Spinner from './Spinner'
import { Text } from './Typography'

type PlantPreviewVariant = 'compact' | 'detailed'

export interface PlantPreviewProps {
  imageUrl?: string | null
  href?: string
  loading?: boolean
  name?: string
  variant: PlantPreviewVariant
}

const PlantContainer = styled.div<{ $loading: boolean; variant: PlantPreviewVariant }>`
  width: 100%;
  height: 100%;
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

  ${({ variant }) =>
    variant === 'compact' &&
    css`
      aspect-ratio: 1 / 1;
    `}

  ${({ variant }) =>
    variant === 'detailed' &&
    css`
      height: 70px;
    `}
`

const StyledLink = styled(Link)<{ variant: PlantPreviewVariant }>`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  align-items: flex-end;
  text-decoration: none;

  &::after {
    display: none;
    content: '';
    position: absolute;
    width: ${({ variant }) => (variant === 'compact' ? '100%' : '70px')};
    height: 100%;
    border: 4px solid ${({ theme }) => theme.colors.yellow};
  }

  &:focus::after {
    display: block;
  }
`

const Label = styled.div<{ gradient: boolean; variant: PlantPreviewVariant }>`
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

  ${({ variant, theme }) =>
    variant === 'detailed' &&
    css`
      order: 2;
      background: ${theme.colors.white};
      height: 100%;
      display: flex;
      align-items: flex-start;
    `}
`

const Background = styled.div<{ variant: PlantPreviewVariant }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ variant }) =>
    variant === 'compact' &&
    css`
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      right: 0;
    `}

  ${({ variant, theme }) =>
    variant === 'detailed' &&
    css`
      order: 1;
      aspect-ratio: 1 / 1;
      width: 70px;
      background: ${theme.colors.green};
    `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function PlantPreview(props: PlantPreviewProps) {
  const { loading = true, href = '', name, imageUrl, variant } = props
  const hasImageUrl = typeof imageUrl === 'string'
  const imageRef = getFileRef(imageUrl === null ? undefined : imageUrl)
  const [downloadedImageUrl, loadingImageUrl] = useDownloadURL(imageRef)

  return (
    <PlantContainer $loading={loading} variant={variant}>
      {loading ? (
        <div>
          <Spinner color={theme.colors.beigeDark} size={45} />
        </div>
      ) : (
        <StyledLink to={href} variant={variant}>
          <Label gradient={hasImageUrl} variant={variant}>
            <Text color={!hasImageUrl || variant === 'detailed' ? 'greenDark' : 'white'}>
              {name}
            </Text>
          </Label>
          <Background variant={variant}>
            {hasImageUrl && !loadingImageUrl ? (
              <img loading="lazy" src={downloadedImageUrl} alt={name} title={name} />
            ) : (
              <CameraOff
                color={variant === 'compact' ? theme.colors.beige : theme.colors.beige}
                size={45}
              />
            )}
          </Background>
        </StyledLink>
      )}
    </PlantContainer>
  )
}
