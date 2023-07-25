import React from 'react'

import { Box } from '@mui/material'

import FormLoginComponent from './Login'

export default {
  title: 'Login: Forms',
  component: FormLoginComponent,
}

export const Default = () => (
  <Box sx={{ mx: 'auto' }}>
    <FormLoginComponent />
  </Box>
)
