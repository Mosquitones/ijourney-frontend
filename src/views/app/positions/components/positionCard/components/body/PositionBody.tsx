import React from 'react'

import { Typography } from '@mui/material'

import * as S from '../../PositionCard.styles'

import { PositionBodyCardTypes } from './PositionBody.types'

export const PositionBody: React.FC<PositionBodyCardTypes> = ({
  description,
}) => {
  return (
    <S.Body>
      <Typography color='text.secondary' variant='body2'>
        {description}
      </Typography>
    </S.Body>
  )
}
