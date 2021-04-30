import React from 'react'
import styled, { css } from 'styled-components'
import { ThemeColors } from 'theme'
import {
  WithCssProps,
  WithMarginProps,
  WithMarginStyles,
  WithPaddingProps,
  WithPaddingStyles,
} from 'utilities/withProps'

type TypographyBaseProps = React.PropsWithChildren<
  WithCssProps<
    WithMarginProps<
      WithPaddingProps<{
        italic?: boolean
        bold?: boolean
        semiBold?: boolean
        center?: boolean
        color: ThemeColors
      }>
    >
  >
>

const TypographyBaseStyles = css<TypographyBaseProps>`
  ${WithMarginStyles}
  ${WithPaddingStyles}
  color: ${({ color, theme }) => theme.colors[color]};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  font-weight: ${(props) => {
    if (props.semiBold) {
      return 500
    } else if (props.bold) {
      return 700
    }
    return 400
  }};
`

/**
 * ###################### Heading ######################
 */
type HeadingProps = TypographyBaseProps & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 's' | 'm' | 'l'
}

export const HeadingBaseStyles = css<HeadingProps>`
  ${TypographyBaseStyles}
  line-height: 1.25;
  font-family: var(--font-normal);
  font-size: ${(props) => {
    if (props.size === 'l') {
      return props.theme.fonts.heading
    } else if (props.size === 'm') {
      return props.theme.fonts.extraLarge
    }
    return props.theme.fonts.large
  }};
`

const HeadingH1 = styled.h1<HeadingProps>`
  ${HeadingBaseStyles}
`
const HeadingH2 = styled.h2<HeadingProps>`
  ${HeadingBaseStyles}
`
const HeadingH3 = styled.h3<HeadingProps>`
  ${HeadingBaseStyles}
`
const HeadingH4 = styled.h4<HeadingProps>`
  ${HeadingBaseStyles}
`
const HeadingH5 = styled.h5<HeadingProps>`
  ${HeadingBaseStyles}
`
const HeadingH6 = styled.h6<HeadingProps>`
  ${HeadingBaseStyles}
`

export function Heading({ children, as, ...props }: HeadingProps) {
  let HeadingContainer = HeadingH1

  switch (as) {
    case 'h2':
      HeadingContainer = HeadingH2
      break
    case 'h3':
      HeadingContainer = HeadingH3
      break
    case 'h4':
      HeadingContainer = HeadingH4
      break
    case 'h5':
      HeadingContainer = HeadingH5
      break
    case 'h6':
      HeadingContainer = HeadingH6
      break
    case 'h1':
    default:
      HeadingContainer = HeadingH1
      break
  }

  return (
    <HeadingContainer as={as} {...props}>
      {children}
    </HeadingContainer>
  )
}

/**
 * ###################### Text ######################
 */
type TextProps = TypographyBaseProps & {
  as?: 'p' | 'span'
  size?: 's' | 'm'
  variant?: 'normal' | 'special'
}

export const TextBaseStyles = css<TextProps>`
  ${TypographyBaseStyles}
  font-family: ${(props) =>
    props.variant === 'normal' ? 'var(--font-normal)' : 'var(--font-special)'};
  word-wrap: break-word;
  line-height: 1.35;
  font-size: ${(props) => {
    switch (props.size) {
      case 's':
        return props.theme.fonts.small
      case 'm':
      default:
        return props.theme.fonts.base
    }
  }};
`

const TextParagraph = styled.p<TextProps>`
  ${TextBaseStyles}
`
const TextSpan = styled.span<TextProps>`
  ${TextBaseStyles}
  display: inline-block;
`

export function Text({ children, as = 'p', variant = 'normal', size = 'm', ...rest }: TextProps) {
  const TextContainer = as === 'p' ? TextParagraph : TextSpan

  return (
    <TextContainer variant={variant} size={size} {...rest}>
      {children}
    </TextContainer>
  )
}
