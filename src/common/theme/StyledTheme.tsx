import React from 'react'

import { useTheme } from '@mui/material'
import { FCWithChildren } from '@types'
import { ThemeProvider } from 'styled-components'

export const StyledThemeWrapper: FCWithChildren = ({ children }) => {
  const theme = useTheme()

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
