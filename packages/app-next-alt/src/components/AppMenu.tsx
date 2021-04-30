import React from 'react'
import { NavLink } from 'react-router-dom'
import { routePaths } from 'routes'
import { useAppStore } from 'store'
import styled, { css } from 'styled-components'
import { bounce, theme } from 'theme'
import BaseSVG from './BaseSVG'
import VisuallyHidden from './VisuallyHidden'

const HomeIcon = () => (
  <BaseSVG width="24px" height="26px" viewBox="0 0 24 26">
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(1.000000, 1.000000)" stroke={theme.colors.greenDark} strokeWidth="2">
        <path
          d="M0,8.4 L10.8,0 L21.6,8.4 L21.6,21.6 C21.6,22.9254834 20.5254834,24 19.2,24 L2.4,24 C1.0745166,24 0,22.9254834 0,21.6 L0,8.4 Z"
          id="Path"
        />
        <polyline id="Path" points="7.2 24 7.2 12 14.4 12 14.4 24" />
      </g>
    </g>
  </BaseSVG>
)

const WateringIcon = () => (
  <BaseSVG width="22px" height="26px" viewBox="0 0 22 26">
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(-1.000000, 1.000000)" stroke={theme.colors.greenDark} strokeWidth="2">
        <g transform="translate(2.000000, 0.000000)">
          <path
            d="M9.99375018,0 L17.0685429,7.03152616 C19.9297981,9.87341972 20.786532,14.1486795 19.2391516,17.863262 C17.6917711,21.5778444 14.0451004,24 10,24 C5.95489959,24 2.30822892,21.5778444 0.760848439,17.863262 C-0.786532048,14.1486795 0.0702019259,9.87341972 2.93145713,7.03152616 L9.99375018,0 Z"
            id="Path"
          />
        </g>
      </g>
    </g>
  </BaseSVG>
)

const NewIcon = () => (
  <BaseSVG width="26px" height="26px" viewBox="0 0 26 26">
    <g
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(1.000000, 1.000000)"
      stroke={theme.colors.greenDark}
      strokeWidth="2"
    >
      <rect x="0" y="0" width="24" height="24" rx="4" />
      <line x1="12" y1="6.66666667" x2="12" y2="17.3333333" />
      <line x1="6.66666667" y1="12" x2="17.3333333" y2="12" />
    </g>
  </BaseSVG>
)

const SettingsIcon = () => (
  <BaseSVG
    width="26px"
    height="26px"
    viewBox="0 0 26 26"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g transform="translate(1.000000, 1.000000)">
      <path d="M20.0727273,15.2727273 C19.775622,15.9459164 19.9181827,16.7321599 20.4327273,17.2581818 L20.4981818,17.3236364 C20.9078772,17.7328762 21.13808,18.288198 21.13808,18.8672727 C21.13808,19.4463475 20.9078772,20.0016693 20.4981818,20.4109091 C20.088942,20.8206045 19.5336202,21.0508073 18.9545455,21.0508073 C18.3754707,21.0508073 17.8201489,20.8206045 17.4109091,20.4109091 L17.3454545,20.3454545 C16.8194327,19.83091 16.0331892,19.6883493 15.36,19.9854545 C14.7005775,20.2680745 14.2719523,20.9152986 14.2690909,21.6327273 L14.2690909,21.8181818 C14.2690909,23.0231667 13.2922576,24 12.0872727,24 C10.8822878,24 9.90545455,23.0231667 9.90545455,21.8181818 L9.90545455,21.72 C9.88817084,20.9810954 9.42095102,20.3278529 8.72727273,20.0727273 C8.05408356,19.775622 7.26784007,19.9181827 6.74181818,20.4327273 L6.67636364,20.4981818 C6.2671238,20.9078772 5.711802,21.13808 5.13272727,21.13808 C4.55365255,21.13808 3.99833074,20.9078772 3.58909091,20.4981818 C3.17939554,20.088942 2.94919275,19.5336202 2.94919275,18.9545455 C2.94919275,18.3754707 3.17939554,17.8201489 3.58909091,17.4109091 L3.65454545,17.3454545 C4.16909005,16.8194327 4.31165068,16.0331892 4.01454545,15.36 C3.73192551,14.7005775 3.08470137,14.2719523 2.36727273,14.2690909 L2.18181818,14.2690909 C0.976833273,14.2690909 0,13.2922576 0,12.0872727 C0,10.8822878 0.976833273,9.90545455 2.18181818,9.90545455 L2.28,9.90545455 C3.01890456,9.88817084 3.67214708,9.42095102 3.92727273,8.72727273 C4.22437795,8.05408356 4.08181732,7.26784007 3.56727273,6.74181818 L3.50181818,6.67636364 C3.09212282,6.2671238 2.86192002,5.711802 2.86192002,5.13272727 C2.86192002,4.55365255 3.09212282,3.99833074 3.50181818,3.58909091 C3.91105802,3.17939554 4.46637982,2.94919275 5.04545455,2.94919275 C5.62452927,2.94919275 6.17985108,3.17939554 6.58909091,3.58909091 L6.65454545,3.65454545 C7.18056735,4.16909005 7.96681083,4.31165068 8.64,4.01454545 L8.72727273,4.01454545 C9.38669521,3.73192551 9.81532047,3.08470137 9.81818182,2.36727273 L9.81818182,2.18181818 C9.81818182,0.976833273 10.7950151,0 12,0 C13.2049849,0 14.1818182,0.976833273 14.1818182,2.18181818 L14.1818182,2.28 C14.1846795,2.99742864 14.6133048,3.64465278 15.2727273,3.92727273 C15.9459164,4.22437795 16.7321599,4.08181732 17.2581818,3.56727273 L17.3236364,3.50181818 C17.7328762,3.09212282 18.288198,2.86192002 18.8672727,2.86192002 C19.4463475,2.86192002 20.0016693,3.09212282 20.4109091,3.50181818 C20.8206045,3.91105802 21.0508073,4.46637982 21.0508073,5.04545455 C21.0508073,5.62452927 20.8206045,6.17985108 20.4109091,6.58909091 L20.3454545,6.65454545 C19.83091,7.18056735 19.6883493,7.96681083 19.9854545,8.64 L19.9854545,8.72727273 C20.2680745,9.38669521 20.9152986,9.81532047 21.6327273,9.81818182 L21.8181818,9.81818182 C23.0231667,9.81818182 24,10.7950151 24,12 C24,13.2049849 23.0231667,14.1818182 21.8181818,14.1818182 L21.72,14.1818182 C21.0025714,14.1846795 20.3553472,14.6133048 20.0727273,15.2727273 Z" />
      <circle cx="12" cy="12" r="3.27272727" />
    </g>
  </BaseSVG>
)

const AppMenuContainer = styled.nav<{ enableAnimations: boolean }>`
  height: ${({ theme }) => theme.frameWidgetHeight};
  width: 100%;
  background: ${({ theme }) => theme.colors.beige};
  position: sticky;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;

  > a {
    height: 100%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
      outline: none;
    }

    &.active svg {
      animation: ${({ enableAnimations }) =>
        enableAnimations
          ? css`
              ${bounce} 650ms
            `
          : 'none'};
    }

    & svg {
      width: 24px;
      height: 24px;
      stroke: ${(props) => props.theme.colors.greenDark};
      transition: fill var(--base-transition) ease-in-out, stroke var(--base-transition) ease-in-out;
    }

    &#menu-link-home:focus svg,
    &#menu-link-home.active svg {
      & path {
        fill: ${(props) => props.theme.colors.greenDark};
      }
      & polyline {
        stroke: ${(props) => props.theme.colors.beige};
      }
    }

    &#menu-link-watering:focus svg,
    &#menu-link-watering.active svg {
      & path {
        stroke: ${(props) => props.theme.colors.blueDark};
        fill: ${(props) => props.theme.colors.blueDark};
      }
    }

    &#menu-link-add-new:focus svg,
    &#menu-link-add-new.active svg {
      & rect {
        fill: ${(props) => props.theme.colors.greenDark};
      }
      & line {
        stroke: ${(props) => props.theme.colors.beige};
      }
    }

    &#menu-link-settings:focus svg,
    &#menu-link-settings.active svg {
      & circle {
        fill: ${(props) => props.theme.colors.beige};
        stroke: ${(props) => props.theme.colors.beige};
      }
      & path {
        fill: ${(props) => props.theme.colors.greenDark};
      }
    }
  }
`

export default function AppMenu() {
  const { store } = useAppStore()
  return (
    <AppMenuContainer
      enableAnimations={store.userPreferences.animations === 'enabled'}
      role="navigation"
    >
      <NavLink to={routePaths.home} id="menu-link-home">
        <HomeIcon />
        <VisuallyHidden>Home</VisuallyHidden>
      </NavLink>
      <NavLink to={routePaths.watering} id="menu-link-watering">
        <WateringIcon />
        <VisuallyHidden>Watering</VisuallyHidden>
      </NavLink>
      <NavLink to={routePaths.new} id="menu-link-add-new">
        <NewIcon />
        <VisuallyHidden>Add new</VisuallyHidden>
      </NavLink>
      <NavLink to={routePaths.settings.base} id="menu-link-settings">
        <SettingsIcon />
        <VisuallyHidden>Settings</VisuallyHidden>
      </NavLink>
    </AppMenuContainer>
  )
}
