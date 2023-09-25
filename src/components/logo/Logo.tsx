import React from 'react'

import { Typography } from '@mui/material'

import * as S from './Logo.styles'
import { LogoPropTypes } from './Logo.types'

export const Logo: React.FC<LogoPropTypes> = ({ extended, containerProps }) => {
  return (
    <S.Container {...containerProps}>
      <S.Icon>
        <Typography
          color='white'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          C.
        </Typography>
      </S.Icon>
      {extended && (
        <Typography
          color='black'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          Contrat.aí
        </Typography>
      )}
    </S.Container>
  )
}
