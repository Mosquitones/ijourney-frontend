import React, { PropsWithChildren } from 'react'

import { Button } from '@mui/material'

import { test } from './Button.styles'
import { ButtonPropTypes } from './Button.types'

export const ButtonComponent: React.FC<PropsWithChildren<ButtonPropTypes>> = ({
  primary,
}) => {
  const count = test + 1

  return <Button variant={primary ? 'contained' : 'text'}> {count}</Button>
}
