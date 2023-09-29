/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react'

import {
  Typography,
  CircularProgress as MUICircularProgress,
} from '@mui/material'

import * as S from './CircularProgress.styles'
import { ProgressPropTypes } from './CircularProgress.types'

const COMMON_PROPS = {
  variant: 'determinate',
  thickness: 4,
} as const

export const CircularProgress: React.FC<ProgressPropTypes> = ({
  value,
  color,
  ...rest
}) => {
  const newValue = useMemo(() => {
    if (value > 100) return 100
    if (value < 0) return 0
    return value
  }, [value])

  return (
    <S.Container>
      <MUICircularProgress {...COMMON_PROPS} value={100} size={rest.size} />
      <MUICircularProgress
        {...COMMON_PROPS}
        {...rest}
        color={color}
        value={value}
      />
      <S.LabelContainer>
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >{`${Math.round(
          Number.isNaN(Number(newValue)) ? 0 : newValue
        )}%`}</Typography>
      </S.LabelContainer>
    </S.Container>
  )
}
