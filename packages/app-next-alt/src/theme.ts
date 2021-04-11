import { createGlobalStyle, DefaultTheme, keyframes } from 'styled-components'
import reset from 'styled-reset'

export type ThemeColors =
  | 'black'
  | 'white'
  | 'beige'
  | 'beigeDark'
  | 'red'
  | 'redLight'
  | 'yellow'
  | 'yellowLight'
  | 'green'
  | 'greenDark'
  | 'blue'
  | 'blueDark'

export type ThemeFontSizes = 'heading' | 'extraLarge' | 'large' | 'base' | 'small'
export type ThemeSpacings = 's' | 'm' | 'l'

export interface CustomTheme {
  baseRadius: string
  frameWidgetHeight: string
  frameMaxWidth: string
  colors: Record<ThemeColors, string>
  fonts: Record<ThemeFontSizes, string>
  spacings: Record<ThemeSpacings, string>
}

const baseFontSize = 16
const baseSpacing = 8

export const theme: DefaultTheme = {
  baseRadius: '2px',
  frameWidgetHeight: '50px',
  frameMaxWidth: '375px',

  colors: {
    // Primary
    black: '#000000',
    white: '#ffffff',
    beige: '#F0EDE5',
    red: '#E54B4B',
    yellow: '#EEB200',
    green: '#1B6D4F',
    blue: '#3B77E1',
    // Secondary
    beigeDark: '#686662',
    redLight: '#EC8A8A',
    yellowLight: '#F2DD9F',
    greenDark: '#0A3E2B',
    blueDark: '#112378',
  },

  fonts: {
    heading: `${1.75 * baseFontSize}px`, // 28px
    extraLarge: `${1.5 * baseFontSize}px`, // 24px
    large: `${1.25 * baseFontSize}px`, // 20px
    base: `${baseFontSize}px`,
    small: `${0.875 * baseFontSize}px`, // 14px
  },

  spacings: {
    s: `${baseSpacing / 2}px`, // 4px
    m: `${baseSpacing}px`, // 8px
    l: `${baseSpacing * 2}px`, // 16px
  },
}

export const appear = keyframes`{
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  1% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`

export const appearReverse = keyframes`{
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  99% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}`

export const spin = keyframes`{
  100% {
    transform: rotate(360deg);
  }
}`

export const bounce = keyframes`{
  from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.1, 0.87, 1);
  }

  40% {
    transform: scale3d(0.87, 1.1, 1);
  }

  50% {
    transform: scale3d(1.1, 0.95, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}`

export const GlobalStyle = createGlobalStyle<{ enableAnimations: boolean }>`
  ${reset}

  @font-face {
    font-family: 'Asap';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url('/assets/fonts/Asap-Regular.eot');
    src:
      local('Asap Regular'),
      local('Asap-Regular'),
      url('/assets/fonts/Asap-Regular.eot?#iefix') format('embedded-opentype'),
      url('/assets/fonts/Asap-Regular.woff2') format('woff2'),
      url('/assets/fonts/Asap-Regular.woff') format('woff'),
      url('/assets/fonts/Asap-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Asap';
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: url('/assets/fonts/Asap-Medium.eot');
    src:
      local('Asap Medium'),
      local('Asap-Medium'),
      url('/assets/fonts/Asap-Medium.eot?#iefix') format('embedded-opentype'),
      url('/assets/fonts/Asap-Medium.woff2') format('woff2'),
      url('/assets/fonts/Asap-Medium.woff') format('woff'),
      url('/assets/fonts/Asap-Medium.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Asap';
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url('/assets/fonts/Asap-Bold.eot');
    src:
      local('Asap Bold'),
      local('Asap-Bold'),
      url('/assets/fonts/Asap-Bold.eot?#iefix') format('embedded-opentype'),
      url('/assets/fonts/Asap-Bold.woff2') format('woff2'),
      url('/assets/fonts/Asap-Bold.woff') format('woff'),
      url('/assets/fonts/Asap-Bold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'FiraMono';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url('/assets/fonts/FiraMono-Regular.eot');
    src:
      local('FiraMono Regular'),
      local('FiraMono-Regular'),
      url('/assets/fonts/FiraMono-Regular.eot?#iefix') format('embedded-opentype'),
      url('/assets/fonts/FiraMono-Regular.woff2') format('woff2'),
      url('/assets/fonts/FiraMono-Regular.woff') format('woff'),
      url('/assets/fonts/FiraMono-Regular.ttf') format('truetype');
  }

  :root {
    --font-special: 'FiraMono', 'Courier New', Courier, monospace;
    --font-normal: "Asap", Open Sans, Helvetica, Arial, sans-serif;
    --base-transition: ${({ enableAnimations }) => (enableAnimations ? '100ms' : '0')};
  }

  * {
    /* Prevent iOS from automatically zooming in the website. */
    text-size-adjust: none;

    &,
    &::before,
    &::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  }

  html {
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    background: ${theme.colors.beige};
    margin: 0;
    font-family: var(--font-normal);
    font-size: ${baseFontSize}px;
    font-weight: 400;
    line-height: 140%;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100vw;
    min-width: ${theme.frameMaxWidth};
    height: 100%;
    min-height: 100vh;
  }

  strong {
    font-weight: bold;
  }

  a:hover {
    color: ${theme.colors.greenDark};
  }
`
