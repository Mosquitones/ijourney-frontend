/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  CheckCircle,
  CheckCircleRounded,
  CheckRounded,
  CheckSharp,
  CircleRounded,
  CircleSharp,
  Close,
  FiberManualRecordSharp,
  PendingSharp,
  WatchLater,
} from '@mui/icons-material'
import {
  Timeline,
  timelineItemClasses,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from '@mui/lab'
import { Box, SvgIcon, Typography } from '@mui/material'
import { RowTopic } from 'components/topicList/components'

import { PositionStatusPropTypes } from './PositionStatus.types'

export const PositionStatus: React.FC<PositionStatusPropTypes> = ({
  title = 'Status',
  phases = [],
  currentPhaseIndex,
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          pl: 0,
          mt: -3.2,
          mb: -3.2,
        }}
      >
        {phases
          .sort((a, b) => a.sequenceIndex - b.sequenceIndex)
          .map((phase) => {
            const isCompleted = phase.sequenceIndex <= currentPhaseIndex
            const isPendingNextStep =
              phase.sequenceIndex === currentPhaseIndex + 1
            const color = isCompleted
              ? 'success.main'
              : isPendingNextStep
              ? 'warning.main'
              : 'divider'

            const opacityShouldBeInvisible = (cond: boolean) => (cond ? 0 : 1)

            return (
              <TimelineItem key={phase.id}>
                <TimelineSeparator>
                  <TimelineConnector
                    color='primary'
                    sx={{
                      bgcolor: color,
                      opacity: opacityShouldBeInvisible(
                        phase.phaseStatusType === 'APPLIED'
                      ),
                    }}
                  />

                  <TimelineDot sx={{ bgcolor: 'white', p: 0 }}>
                    <SvgIcon
                      component={
                        isCompleted
                          ? CheckCircleRounded
                          : isPendingNextStep
                          ? WatchLater
                          : PendingSharp
                      }
                      color='inherit'
                      sx={{
                        fontSize: 20,
                        color,
                      }}
                    />
                  </TimelineDot>
                  <TimelineConnector
                    sx={{
                      bgcolor: color,
                      opacity: opacityShouldBeInvisible(
                        phase.phaseStatusType === 'HIRED'
                      ),
                    }}
                  />
                </TimelineSeparator>
                <TimelineContent
                  display='flex'
                  alignItems='center'
                  gap={2}
                  flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
                >
                  <Typography
                    color='text.secondary'
                    sx={{
                      textDecorationLine: isCompleted
                        ? 'line-through'
                        : 'initial',
                    }}
                  >
                    {phase.description}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            )
          })}
      </Timeline>
    </Box>
  )
}
