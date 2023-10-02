import React from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { Avatar, CircularProgress, getContrastRatio } from '@mui/material'
import stringToColor from 'string-to-color'

import { PositionAvatarIconPropTypes } from './PositionAvatarIcon.types'

export const PositionAvatarIcon: React.FC<PositionAvatarIconPropTypes> = ({
  positionId,
  positionTitle,
  avatarProps,
  isLoading,
  size = 54,
}) => {
  const bgColor = stringToColor(`${positionTitle} ${positionId} dark`)

  const contrastIconColor =
    getContrastRatio(bgColor, '#fffffff') > 1.6 ? '#ffffff' : '#000000'

  return (
    <Avatar
      sx={{
        ...avatarProps?.sx,
        backgroundColor: isLoading ? ({ palette }) => palette.divider : bgColor,
        width: size,
        height: size,
      }}
      variant='rounded'
    >
      {isLoading ? (
        <CircularProgress size={size / 2} color='inherit' />
      ) : (
        <BusinessCenter sx={{ color: contrastIconColor }} />
      )}
    </Avatar>
  )
}
