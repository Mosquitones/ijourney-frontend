import React from 'react'

import { Close } from '@mui/icons-material'
import { Typography, IconButton } from '@mui/material'

import * as S from './DialogTitle.styles'
import { DialogTitlePropTypes } from './DialogTitle.types'
export const DialogTitleComponent: React.FC<DialogTitlePropTypes> = ({
  onClose,
  title,
}) => {
  return (
    <S.DialogTitle>
      <Typography
        variant='h4'
        noWrap
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>
      <IconButton
        aria-label='close'
        onClick={onClose}
        sx={{
          mr: -2,
          border: ({ palette }) => `0.1rem solid ${palette.divider}`,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
    </S.DialogTitle>
  )
}
