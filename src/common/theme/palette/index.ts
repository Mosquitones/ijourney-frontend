/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from '@mui/material'

import { getPaletteColors } from './utils'

const PRIMARY_PALETTE_COLORS = getPaletteColors(
  `#${import.meta.env.VITE_APP_PRIMARY_COLOR}`
)
const SECONDARY_PALETTE_COLORS = getPaletteColors('#63A5EA')
const SUCCESS_PALETTE_COLORS = getPaletteColors('#34DD1E')
const ERROR_PALETTE_COLORS = getPaletteColors('#FF515A')
const WARNING_PALETTE_COLORS = getPaletteColors('#FFCC00')
const INFO_PALETTE_COLORS = getPaletteColors('#5990FF')

export const palette: Theme['palette'] = {
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  primary: PRIMARY_PALETTE_COLORS,
  secondary: SECONDARY_PALETTE_COLORS,
  success: SUCCESS_PALETTE_COLORS,
  error: ERROR_PALETTE_COLORS,
  warning: WARNING_PALETTE_COLORS,
  info: INFO_PALETTE_COLORS,
  text: {
    primary: '#000000',
    secondary: '#69707E',
    disabled: '#8D8D8D',
  },
  black: {
    main: '#000000',
    dark: '#000000',
    light: '#000000',
    contrastText: '#FFFFFF',
  },
  grey: {
    A100: '#FEFEFD',
    A200: '#F8F7F5',
    A400: '#F5F5F5',
    A700: '#DDDDDD',
    50: '#E2E2E2',
    100: '#E2E2E2',
    200: '#C6C6C6',
    300: '#AAAAAA',
    400: '#8D8D8D',
    600: '#555555',
    800: '#1C1C1C',
    light: '#717171',
    main: '#383838',
    dark: '#000000',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F6F8FC',
  },
}
