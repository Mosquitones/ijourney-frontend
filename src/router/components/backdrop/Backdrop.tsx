import React from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

import { BackdropPropTypes } from './Backdrop.types'

export const BackdropComponent: React.FC<BackdropPropTypes> = ({
  open,
  onClick,
  color = 'primary',
}) => (
  <Backdrop data-testid='backdropComponent' open={open} onClick={onClick}>
    <CircularProgress color={color} />
  </Backdrop>
)

export * from './Backdrop.types'
