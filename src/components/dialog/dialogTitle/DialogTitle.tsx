import React from 'react'

import { Close } from '@mui/icons-material'
import { Typography, IconButton } from '@mui/material'

import * as S from './DialogTitle.styles'
import { DialogTitlePropTypes } from './DialogTitle.types'
export const DialogTitleComponent: React.FC<DialogTitlePropTypes> = ({
  onClose,
  title,
  helpTitleAdornment,
}) => {
  return (
    <S.DialogTitle>
      <Typography
        display='flex'
        gap={2}
        alignItems='center'
        variant='h4'
        noWrap
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
        {helpTitleAdornment}
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
