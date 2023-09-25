import React from 'react'

import { Box, Typography } from '@mui/material'

import { TopicList } from 'components'

import { PositionRequirementPropTypes } from './PositionRequirement.types'

export const PositionRequirement: React.FC<PositionRequirementPropTypes> = ({
  title = 'Requisitos',
  topicListProps,
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>
      {topicListProps && <TopicList {...topicListProps} />}
    </Box>
  )
}
