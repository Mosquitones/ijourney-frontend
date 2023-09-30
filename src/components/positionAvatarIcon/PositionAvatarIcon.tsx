import React from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { Avatar, getContrastRatio } from '@mui/material'
import stringToColor from 'string-to-color'

import { PositionAvatarIconPropTypes } from './PositionAvatarIcon.types'

export const PositionAvatarIcon: React.FC<PositionAvatarIconPropTypes> = ({
  positionId,
  positionTitle,
  avatarProps,
  size = 54,
}) => {
  const bgColor = stringToColor(`${positionTitle} ${positionId} dark`)

  const contrastIconColor =
    getContrastRatio(bgColor, '#fffffff') > 1.6 ? '#ffffff' : '#000000'

  return (
    <Avatar
      sx={{
        ...avatarProps?.sx,
        backgroundColor: bgColor,
        width: size,
        height: size,
      }}
      variant='rounded'
    >
      <BusinessCenter sx={{ color: contrastIconColor }} />
    </Avatar>
  )
}
