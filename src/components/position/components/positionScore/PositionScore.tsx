import React from 'react'

import { Box, Typography } from '@mui/material'
import { RowTopic } from 'components/topicList/components'

import { PositionScorePropTypes } from './PositionScore.types'

export const PositionScore: React.FC<PositionScorePropTypes> = ({
  header = { title: 'Pontuações', endAdornment: null },
  currentScore = 0,
  maxScore = 0,
  minScore = 0,
}) => {
  const isCurrentScoreEqualsMaxScore = currentScore === maxScore
  const isCurrentScoreHigherThanMinScore = currentScore >= minScore

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
      <Box display='flex' flexWrap='wrap' flexDirection='column' gap={1}>
        <RowTopic
          description={`Mínimo: ${minScore} pontos`}
          style={isCurrentScoreHigherThanMinScore ? 'success' : 'default'}
        />
        <RowTopic
          description={`Atual: ${currentScore} pontos`}
          style={
            isCurrentScoreEqualsMaxScore
              ? 'success'
              : isCurrentScoreHigherThanMinScore
              ? 'pending'
              : 'default'
          }
        />
        <RowTopic
          description={`Máximo: ${maxScore} pontos`}
          style={isCurrentScoreEqualsMaxScore ? 'success' : 'default'}
        />
      </Box>
    </Box>
  )
}
