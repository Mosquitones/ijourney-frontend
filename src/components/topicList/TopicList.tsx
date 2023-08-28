import React from 'react'

import { Box } from '@mui/material'

import { RowTopic } from './components'

export const TopicList: React.FC = () => {
  return (
    <Box display='flex' flexWrap='wrap' flexDirection='column' gap={2}>
      {[...Array(5)].map((_, i) => (
        <RowTopic
          key={crypto.randomUUID() + i}
          description='Possui certificado EY Institute'
          numberOfPoints={120}
          style={i === 0 ? 'success' : 'default'}
        />
      ))}
    </Box>
  )
}
