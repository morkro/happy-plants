import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'

const LogoSvg = styled.svg`
  width: 32px;
  height: 28px;
`

interface AppLogoProps {
  color?: 'greenDark' | 'white' | 'beigeDark'
  fill?: boolean
  inverse?: boolean
}

export default function AppLogo(props: AppLogoProps) {
  const { color = 'greenDark', fill = true, inverse = false } = props
  const logoColor = theme.colors[color]
  return (
    <LogoSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 31"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" fillRule="evenodd" stroke={inverse || fill === false ? logoColor : undefined}>
        {inverse ? (
          <React.Fragment>
            <path
              d="M22.466 5.75c3.086-2.086 6.395-3.318 8.548-2.075 4.304 2.485 2.35 13.929-.16 18.277-2.385 4.13-7.487 5.7-11.681 3.719 3.8-1.065 6.59-4.584 6.59-8.762 0-2.846-1.294-7.577-3.32-11.142z"
              strokeWidth="1.5"
              fill={logoColor}
            />
            <path
              d="M4.014 11.273c1.216-.702 2.894-.41 4.63.404-.564 1.96-.88 3.826-.88 5.232 0 4.616 3.405 8.428 7.817 9.013a7.055 7.055 0 01-2.067 1.805c-3.349 1.933-7.61.822-9.517-2.483-1.908-3.305-3.332-12.038.017-13.971z"
              strokeWidth="2"
              fill={logoColor}
            />
            <path
              d="M16.764 26c4.97 0 9-4.07 9-9.09 0-5.022-4.03-15.91-9-15.91-4.971 0-9 10.888-9 15.91 0 5.02 4.029 9.09 9 9.09"
              strokeWidth="1.5"
            />
            <path
              strokeWidth="1.5"
              fill={logoColor}
              strokeLinecap="round"
              d="M20.764 17l-3.984 4.902M12.739 16.984l3.984 4.902M13.758 11.996l2.946 3.878M19.716 11.996l-2.946 3.878M16.764 6v20"
            />
          </React.Fragment>
        ) : fill ? (
          <React.Fragment>
            <path
              stroke={logoColor}
              strokeLinejoin="bevel"
              strokeWidth="2"
              d="M21.338 6.447c2.967-2.002 6.128-3.164 8.194-1.957 4.192 2.449 2.288 13.724-.157 18.008-2.321 4.068-7.29 5.614-11.374 3.663 3.701-1.049 6.418-4.516 6.418-8.632 0-2.804-1.261-7.465-3.235-10.977z"
            />
            <path
              stroke={logoColor}
              strokeLinecap="round"
              strokeLinejoin="bevel"
              strokeWidth="2"
              d="M3.417 10.91c1.229-.68 2.902-.36 4.624.486-.599 1.951-.948 3.814-.972 5.221-.08 4.62 3.258 8.494 7.66 9.157a7.058 7.058 0 01-2.1 1.77c-3.381 1.876-7.622.69-9.473-2.651-1.85-3.341-3.12-12.106.261-13.982z"
            />
            <path
              fill={logoColor}
              d="M15 1c4.97 0 9 10.892 9 15.915 0 4.885-3.81 8.87-8.592 9.085v-3.925l3.908-4.81.02-.028a.41.41 0 00-.078-.548.407.407 0 00-.574.059l-3.276 4.033v-4.756l2.87-3.777.018-.028a.41.41 0 00-.096-.545.407.407 0 00-.571.077l-2.221 2.924V6.002l-.001-.03a.408.408 0 00-.815.03v8.744l-2.274-2.994-.021-.026a.407.407 0 00-.55-.051.41.41 0 00-.077.573l2.922 3.847v4.7l-3.3-4.064-.023-.025a.407.407 0 00-.551-.033.41.41 0 00-.059.575l3.933 4.841V26C9.811 25.785 6 21.8 6 16.915 6 11.892 10.03 1 15 1z"
            />
            <path
              stroke={logoColor}
              strokeWidth="1.5"
              d="M15 26c4.97 0 9-4.07 9-9.09C24 11.887 19.97 1 15 1S6 11.888 6 16.91C6 21.93 10.03 26 15 26"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <path
              stroke={logoColor}
              strokeWidth="1.5"
              d="M22.466 5.75c3.086-2.086 6.395-3.318 8.548-2.075 4.304 2.485 2.35 13.929-.16 18.277-2.385 4.13-7.487 5.7-11.681 3.719 3.8-1.065 6.59-4.584 6.59-8.762 0-2.846-1.294-7.577-3.32-11.142z"
            />
            <path
              stroke={logoColor}
              strokeWidth="2"
              d="M4.014 11.273c1.216-.702 2.894-.41 4.63.404-.564 1.96-.88 3.826-.88 5.232 0 4.616 3.405 8.428 7.817 9.013a7.055 7.055 0 01-2.067 1.805c-3.349 1.933-7.61.822-9.517-2.483-1.908-3.305-3.332-12.038.017-13.971z"
            />
            <path
              strokeWidth="1.5"
              d="M16.764 26c4.97 0 9-4.07 9-9.09 0-5.022-4.03-15.91-9-15.91-4.971 0-9 10.888-9 15.91 0 5.02 4.029 9.09 9 9.09"
            />
            <path
              stroke={logoColor}
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M20.764 17l-3.984 4.902M12.739 16.984l3.984 4.902M13.758 11.996l2.946 3.878M19.716 11.996l-2.946 3.878M16.764 6v20"
            />
          </React.Fragment>
        )}
      </g>
    </LogoSvg>
  )
}
