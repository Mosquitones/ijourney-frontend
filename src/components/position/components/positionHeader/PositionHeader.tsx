import React from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'

import { ChipList } from 'components'

import * as S from './PositionHeader.styles'

export const PositionHeader: React.FC = () => {
  return (
    <S.HeaderMainContent>
      <Avatar
        sx={{
          bgcolor: ({ palette }) => palette.primary.main,
          width: 54,
          height: 54,
        }}
        variant='rounded'
      >
        <BusinessCenter />
      </Avatar>
      <Box display='flex' flexDirection='column' gap={1}>
        <Typography fontWeight={({ typography }) => typography.fontWeightBold}>
          Company
        </Typography>
        <ChipList />
      </Box>
    </S.HeaderMainContent>
  )
}
