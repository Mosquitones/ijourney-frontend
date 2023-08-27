import React, { useMemo, useRef } from 'react'

import { Typography, Tooltip } from '@mui/material'

import { DisplayHeaderContainerStyles } from './DisplayHeader.styles'
import { DisplayHeaderPropTypes } from './DisplayHeader.types'

export const DisplayHeaderComponent: React.FC<DisplayHeaderPropTypes> = ({
  title,
}) => {
  const titleRef = useRef<HTMLParagraphElement>(null)

  const isEllipsisActivated = useMemo(() => {
    if (!titleRef.current) return false

    const { offsetWidth, scrollWidth } = titleRef.current

    return offsetWidth < scrollWidth
  }, [])

  return (
    <Tooltip
      title={title}
      placement='top'
      disableHoverListener={!isEllipsisActivated}
      arrow
    >
      <DisplayHeaderContainerStyles>
        <Typography
          noWrap
          ref={titleRef}
          variant='body2'
          fontWeight={(theme) => theme.typography.fontWeightBold}
        >
          {title}
        </Typography>
      </DisplayHeaderContainerStyles>
    </Tooltip>
  )
}

export * from './DisplayHeader.types'
