/* eslint-disable @typescript-eslint/no-empty-interface */
import { Theme } from '@mui/material'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
