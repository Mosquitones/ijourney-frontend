import React from 'react'

import { Divider, Paper, Typography } from '@mui/material'

import { DataContainerPropTypes } from './DataContainer.types'

// import { Container } from './styles';

export const DataContainer: React.FC<DataContainerPropTypes> = ({
  title,
  children,
  paperProps,
}) => {
  return (
    <Paper
      {...paperProps}
      sx={{
        ...paperProps?.sx,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        height: '100%',
        flex: 1,
      }}
    >
      <Typography
        variant='h6'
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>
      <Divider />
      {children}
    </Paper>
  )
}
