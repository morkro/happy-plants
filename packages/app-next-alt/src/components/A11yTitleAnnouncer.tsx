import React, { useState, createRef, useEffect } from 'react'
import config from 'config'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import VisuallyHidden from './VisuallyHidden'

export default function TitleAnnouncer() {
  const [title, setTitle] = useState('')
  const titleRef = createRef<HTMLParagraphElement>()
  const { pathname } = useLocation()
  const onHelmetChange = ({ title }: { title: string }) =>
    setTitle(title?.replace(` | ${config.meta.title}`, ''))

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [pathname, titleRef])

  return (
    <React.Fragment>
      <Helmet onChangeClientState={onHelmetChange} />
      <VisuallyHidden tabIndex={-1} ref={titleRef}>
        {title}
      </VisuallyHidden>
    </React.Fragment>
  )
}
