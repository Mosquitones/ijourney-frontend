import { Dispatch, SetStateAction } from 'react'

import { ThemeOptions } from '@mui/material'
import { CustomPaletteColor } from 'common/utils'
import { NavItemTypes } from 'layout'

type AvailableColors =
  | 'blue'
  | 'cyan'
  | 'green'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'

export type ColorTypes = {
  id: AvailableColors
  hex: string
  paletteColor: CustomPaletteColor
}

export interface LayoutContextTypes {
  userNavItems: NavItemTypes[] | null
  colors: ColorTypes[]
  // appPaletteColors: ColorTypes
  appColor: AvailableColors
  setAppColor: Dispatch<SetStateAction<LayoutContextTypes['appColor']>>
  setTheme: Dispatch<SetStateAction<ThemeOptions>>
}
