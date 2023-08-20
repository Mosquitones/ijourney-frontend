/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { InputLabel, TextField, TextFieldProps } from '@mui/material'

import * as S from './Input.styles'

export const Input: React.FC<TextFieldProps> = ({
  label,
  variant = 'outlined',
  ...rest
}) => {
  return (
    <S.Container>
      {label && (
        <InputLabel
          htmlFor={rest.name}
          sx={{ fontWeight: ({ typography }) => typography.fontWeightSemiBold }}
        >
          {label}
        </InputLabel>
      )}
      <S.Input {...rest} variant={variant} id={rest.name} size='small' />
    </S.Container>
  )
}
