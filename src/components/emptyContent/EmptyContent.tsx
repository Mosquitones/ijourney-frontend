import React from 'react'

import { InboxOutlined } from '@mui/icons-material'
import { Box, SvgIcon, Typography } from '@mui/material'

import { EmptyContentPropTypes } from './EmptyContent.types'

export const EmptyContent: React.FC<EmptyContentPropTypes> = ({
  icon = InboxOutlined,
  title = 'Nenhum resultado encontrado',
  description = 'Nenhum resultado encontrado neste momento, tente criar um novo item ou atualizar a página com F5.',
  boxProps,
}) => {
  return (
    <Box
      {...boxProps}
      display='flex'
      flexDirection='column'
      gap={1}
      justifyContent='center'
      alignItems='center'
      p={3}
    >
      <SvgIcon component={icon} sx={{ fontSize: 62 }} />

      <Box
        display='flex'
        flexDirection='column'
        gap={1}
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        maxWidth={500}
      >
        <Typography
          variant='h6'
          fontWeight={(theme) => theme.typography.fontWeightBold}
        >
          {title}
        </Typography>
        <Typography variant='body2'>{description}</Typography>
      </Box>
    </Box>
  )
}
