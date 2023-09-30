/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { Avatar } from '@mui/material'

import { stringToColor } from 'utils'

import { PositionAvatarIconPropTypes } from './PositionAvatarIcon.types'

export const PositionAvatarIcon: React.FC<PositionAvatarIconPropTypes> = ({
  positionId,
  avatarProps,
  size = 54,
}) => {
  const bgColor = stringToColor(String(positionId))

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
      <BusinessCenter />
    </Avatar>
  )
}
