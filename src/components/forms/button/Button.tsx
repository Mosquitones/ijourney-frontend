import React from 'react'

import { LoadingButton } from '@mui/lab'
import { FCWithChildren } from '@types'

import { ButtonPropTypes } from './Button.types'

export const Button: FCWithChildren<ButtonPropTypes> = ({
  value,
  children = value,
  rounded = false,
  ...props
}) => {
  const { fontWeight, ...rest } = props

  return (
    <LoadingButton
      sx={{
        fontWeight,
        borderRadius: rounded ? 100 : '0.5rem',
        transition: 'all 0.2s ease',
        ...rest.sx,
      }}
      {...rest}
    >
      {children}
    </LoadingButton>
  )
}

export * from './Button.types'
