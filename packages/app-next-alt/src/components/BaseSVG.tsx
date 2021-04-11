import React from 'react'

export default function BaseSVG(props: React.PropsWithChildren<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
      {props.children}
    </svg>
  )
}
