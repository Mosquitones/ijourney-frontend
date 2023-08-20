/* eslint-disable react-hooks/rules-of-hooks */

import { Breakpoint, useMediaQuery, useTheme } from '@mui/material'

export const useIsDevice = () => {
  const isDeviceOnThisScreen = (
    breakpoint: Breakpoint,
    range: 'from' | 'to'
  ) => {
    const theme = useTheme()

    if (range === 'from') return useMediaQuery(theme.breakpoints.up(breakpoint))

    return useMediaQuery(theme.breakpoints.down(breakpoint))
  }

  const to: Record<Breakpoint, boolean> = {
    xs: isDeviceOnThisScreen('xs', 'to'),
    sm: isDeviceOnThisScreen('sm', 'to'),
    md: isDeviceOnThisScreen('md', 'to'),
    lg: isDeviceOnThisScreen('lg', 'to'),
    xl: isDeviceOnThisScreen('xl', 'to'),
  }

  const from: Record<Breakpoint, boolean> = {
    xs: isDeviceOnThisScreen('xs', 'from'),
    sm: isDeviceOnThisScreen('sm', 'from'),
    md: isDeviceOnThisScreen('md', 'from'),
    lg: isDeviceOnThisScreen('lg', 'from'),
    xl: isDeviceOnThisScreen('xl', 'from'),
  }

  return { to, from }
}
