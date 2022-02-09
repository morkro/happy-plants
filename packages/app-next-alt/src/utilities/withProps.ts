import { css } from 'styled-components'
import { ThemeSpacings } from 'theme'

export type WithCssProps<P> = P & {
  className?: string
  id?: string
}

export type WithMarginProps<P> = P & {
  m?: ThemeSpacings
  mt?: ThemeSpacings | 'auto'
  mr?: ThemeSpacings
  mb?: ThemeSpacings | 'auto'
  ml?: ThemeSpacings
}

export const WithMarginStyles = css<WithMarginProps<{}>>`
  ${({ theme, m, mt, mr, mb, ml }) => css`
    margin: ${m && theme.spacings[m]};
    margin-top: ${mt && (mt === 'auto' ? mt : theme.spacings[mt])};
    margin-right: ${mr && theme.spacings[mr]};
    margin-bottom: ${mb && (mb === 'auto' ? mb : theme.spacings[mb])};
    margin-left: ${ml && theme.spacings[ml]};
  `}
`

export type WithPaddingProps<P> = P & {
  p?: ThemeSpacings
  pt?: ThemeSpacings
  pr?: ThemeSpacings
  pb?: ThemeSpacings
  pl?: ThemeSpacings
}

export const WithPaddingStyles = css<WithPaddingProps<{}>>`
  ${({ theme, p, pt, pr, pb, pl }) => css`
    padding: ${p && theme.spacings[p]};
    padding-top: ${pt && theme.spacings[pt]};
    padding-right: ${pr && theme.spacings[pr]};
    padding-bottom: ${pb && theme.spacings[pb]};
    padding-left: ${pl && theme.spacings[pl]};
  `}
`
