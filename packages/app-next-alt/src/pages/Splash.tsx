import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { theme } from 'theme'
import BaseSVG from 'components/BaseSVG'

const LoadingGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #root {
    background-color: ${({ theme }) => theme.colors.beige};
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default function Splash() {
  return (
    <React.Fragment>
      <LoadingGlobalStyle />
      <BaseSVG
        width="177"
        height="157"
        aria-hidden="false"
        aria-describedby="splash-svg-title splash-svg-description"
        role="img"
      >
        <title id="splash-svg-title">HappyPlants</title>
        <desc id="splash-svg-description">The logo of HappyPlants</desc>
        <g fill="none" fillRule="evenodd">
          <path
            d="M112.1 28.111c16.955-11.44 35.142-18.197 46.97-11.384 23.658 13.628 12.916 76.374-.88 100.216-13.102 22.641-41.14 31.248-64.19 20.387 20.888-5.834 36.22-25.13 36.22-48.039 0-15.605-7.114-41.545-18.252-61.09zM16.253 57.169c6.737-3.725 15.913-1.968 25.354 2.653-3.282 10.663-5.193 20.844-5.328 28.537-.44 25.25 17.87 46.427 42.007 50.05a38.669 38.669 0 01-11.508 9.676c-18.545 10.253-41.803 3.764-51.95-14.496-10.148-18.26-17.12-66.166 1.425-76.42z"
            stroke={theme.colors.greenDark}
            strokeWidth="6"
            strokeLinejoin="bevel"
          />
          <path
            d="M84 3c27.616 0 50 59.688 50 87.214 0 26.768-21.17 48.606-47.735 49.786l-.001-21.507 21.714-26.365.111-.148a2.225 2.225 0 00-.436-3.005 2.281 2.281 0 00-3.186.322l-18.203 22.102v-26.06l15.942-20.701.107-.15c.63-.973.41-2.278-.536-2.99a2.28 2.28 0 00-3.174.424l-12.34 16.023.002-47.535-.007-.167A2.255 2.255 0 0084 28.169c-1.25 0-2.265 1.003-2.265 2.241v47.917L69.1 61.922l-.119-.142a2.282 2.282 0 00-3.055-.283 2.225 2.225 0 00-.43 3.14l16.238 21.085v25.754L63.397 89.207l-.123-.137a2.282 2.282 0 00-3.063-.184 2.225 2.225 0 00-.326 3.152l21.85 26.531V140C55.17 138.82 34 116.982 34 90.214 34 62.688 56.384 3 84 3z"
            fill={theme.colors.greenDark}
          />
          <path
            d="M84 141c27.616 0 50-22.466 50-50.182S111.616 3 84 3 34 63.102 34 90.818 56.384 141 84 141"
            stroke={theme.colors.greenDark}
            strokeWidth="6"
          />
        </g>
      </BaseSVG>
    </React.Fragment>
  )
}
