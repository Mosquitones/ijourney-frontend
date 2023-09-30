/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  AccessTime,
  Check,
  CheckCircleRounded,
  CheckRounded,
  Circle,
  CircleRounded,
  HourglassBottom,
  MoreHorizSharp,
} from '@mui/icons-material'
import { Box, Chip, SvgIcon, Typography } from '@mui/material'
import { useTheme } from 'styled-components'

import { useIsDevice } from 'hooks'

import * as S from './RowTopic.styles'
import { RowTopicPropTypes } from './RowTopic.types'

export const RowTopic: React.FC<RowTopicPropTypes> = ({
  style = 'default',
  description,
  numberOfPoints,
}) => {
  const isDevice = useIsDevice()
  const theme = useTheme()

  const styles = {
    success: {
      color: theme.palette.success.main,
      backgroundIconColor: theme.palette.success.main,
      iconColor: theme.palette.common.white,
      icon: CheckRounded,
      iconSize: 16,
    },
    pending: {
      color: theme.palette.warning.main,
      backgroundIconColor: theme.palette.warning.main,
      iconColor: theme.palette.common.white,
      icon: MoreHorizSharp,
      iconSize: 16,
    },
    default: {
      color: theme.palette.text.secondary,
      backgroundIconColor: theme.palette.common.white,
      iconColor: theme.palette.grey[50],
      icon: CircleRounded,
      iconSize: 12,
    },
  } as const

  const currentStyle = styles[style]

  return (
    <Box display='flex' flexDirection='row' gap={2}>
      <Box
        display='flex'
        alignItems='center'
        gap={2}
        color={currentStyle.color}
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          bgcolor={currentStyle.backgroundIconColor}
          borderRadius={100}
          boxShadow={({ palette }) =>
            `0 0.3rem 0.6rem ${palette.common.black}30`
          }
          height={20}
          width={20}
        >
          <SvgIcon
            component={currentStyle.icon}
            sx={{
              fontSize: currentStyle.iconSize,
              color: currentStyle.iconColor,
            }}
          />
        </Box>
        <Typography
          color='text.secondary'
          noWrap
          sx={{
            textDecorationLine:
              style === 'success' ? 'line-through' : 'initial',
          }}
        >
          {description}
        </Typography>
      </Box>
      {!!numberOfPoints && (
        <S.Chip
          currentHexColor={currentStyle.color || theme.palette.black.main}
          variant='filled'
          label={
            <Typography
              variant='body1'
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              +{numberOfPoints}
            </Typography>
          }
        />
      )}
    </Box>
  )
}
