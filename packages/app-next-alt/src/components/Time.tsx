import React from 'react'
import { toReadableTime } from 'services/dayjs'

interface LocalisedDateProps {
  dateTime: string | number | Date
  children: string | number | Date
}

function LocalisedDate(props: LocalisedDateProps) {
  return (
    <time dateTime={new Date(props.dateTime).toISOString()}>{toReadableTime(props.children)}</time>
  )
}

export default React.memo(LocalisedDate)
