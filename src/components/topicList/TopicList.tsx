import React from 'react'

import { Box } from '@mui/material'

import { RowTopic } from './components'
import { TopicListPropTypes } from './TopicList.types'

export const TopicList: React.FC<TopicListPropTypes> = ({ requirements }) => {
  return (
    <Box display='flex' flexWrap='wrap' flexDirection='column' gap={2}>
      {requirements
        ?.sort((a, b) => a.id - b.id)
        .map((requirement) => (
          <RowTopic
            key={requirement.id}
            description={requirement.skill.name}
            numberOfPoints={requirement.points}
            style={requirement.done ? 'success' : 'default'}
          />
        ))}
    </Box>
  )
}
