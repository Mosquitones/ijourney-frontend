import React from 'react'

import { Box, Typography } from '@mui/material'

import { TopicList } from 'components'

import { PositionStatusPropTypes } from './PositionStatus.types'

export const PositionStatus: React.FC<PositionStatusPropTypes> = ({
  title = 'Status',
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>
      <TopicList />
    </Box>
  )
}
