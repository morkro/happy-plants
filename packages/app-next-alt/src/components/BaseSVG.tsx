import React from 'react'

export default function BaseSVG(props: React.PropsWithChildren<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg aria-hidden="true" focusable="false" {...props}>
      {props.children}
    </svg>
  )
}
