import React from 'react'

import { Box, Typography } from '@mui/material'

import { ChipList, PositionAvatarIcon } from 'components'

import * as S from './PositionHeader.styles'
import { PositionHeaderPropTypes } from './PositionHeader.types'

export const PositionHeader: React.FC<PositionHeaderPropTypes> = ({
  title,
  titleEndAdornment,
  chips,
  positionId,
}) => {
  return (
    <S.HeaderMainContent>
      <PositionAvatarIcon positionId={positionId} />
      <Box display='flex' flexDirection='column' gap={1}>
        <Typography
          fontWeight={({ typography }) => typography.fontWeightBold}
          display='flex'
          alignItems='center'
          gap={1}
        >
          {title}
          {titleEndAdornment}
        </Typography>
        <ChipList chips={chips} />
      </Box>
    </S.HeaderMainContent>
  )
}
