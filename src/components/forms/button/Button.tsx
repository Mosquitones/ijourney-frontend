/* eslint-disable react/display-name */
import React, { PropsWithChildren, forwardRef } from 'react'

import { LoadingButton } from '@mui/lab'

import { ButtonPropTypes } from './Button.types'

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonPropTypes>
>(({ value, children = value, rounded = false, ...props }, ref) => {
  const { fontWeight, ...rest } = props

  return (
    <LoadingButton
      ref={ref}
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
})

export * from './Button.types'
