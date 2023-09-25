/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Box, Typography } from '@mui/material'
import { RowTopic } from 'components/topicList/components'

import { TopicList } from 'components'

import { PositionStatusPropTypes } from './PositionStatus.types'

export const PositionStatus: React.FC<PositionStatusPropTypes> = ({
  title = 'Status',
  phases = [],
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>
      <Box display='flex' flexWrap='wrap' flexDirection='column' gap={1}>
        {phases
          .sort((a, b) => a.sequenceIndex - b.sequenceIndex)
          .map((phase) => (
            <RowTopic
              key={phase.id}
              description={phase.description}
              // numberOfPoints={requirement.points}
              // style={requirement.done ? 'success' : 'default'}
            />
          ))}
      </Box>
    </Box>
  )
}
