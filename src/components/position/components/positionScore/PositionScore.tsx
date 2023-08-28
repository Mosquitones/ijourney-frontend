import React from 'react'

import { Box, Typography } from '@mui/material'

import { TopicList } from 'components'

import { PositionScorePropTypes } from './PositionScore.types'

export const PositionScore: React.FC<PositionScorePropTypes> = ({
  header = { title: 'Pontuações', endAdornment: null },
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography
          variant='body1'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          {header.title}
        </Typography>
        {header.endAdornment}
      </Box>
      <TopicList />
    </Box>
  )
}
