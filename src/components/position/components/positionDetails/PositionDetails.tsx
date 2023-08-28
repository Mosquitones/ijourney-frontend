import React from 'react'

import { Box, Typography } from '@mui/material'

import { PositionDetailsPropTypes } from './PositionDetails.types'

const DetailTextComponent: React.FC<{
  title: string
  value: string
}> = ({ title, value }) => {
  return (
    <Typography variant='body1' color='text.secondary' display='flex' gap={1}>
      <Typography fontWeight={({ typography }) => typography.fontWeightBold}>
        {title}
      </Typography>
      {value}
    </Typography>
  )
}

export const PositionDetails: React.FC<PositionDetailsPropTypes> = ({
  title = 'Detalhes',
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>
      <Box display='flex' flexDirection='column' gap={0.5}>
        <DetailTextComponent title='Aplicado em:' value='15 Jun' />
        <DetailTextComponent title='Vence em:' value='30 Jul' />
        <DetailTextComponent title='Criado por:' value='Anderson Ramires' />
      </Box>
    </Box>
  )
}
