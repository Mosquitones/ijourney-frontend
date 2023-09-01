import { Dispatch, SetStateAction } from 'react'

import { CustomPaletteColor } from 'common/utils'

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

export interface AccessibilityContextTypes {
  colors: ColorTypes[]
  appPaletteColors: ColorTypes
  appColor: AvailableColors
  setAppColor: Dispatch<SetStateAction<AccessibilityContextTypes['appColor']>>
}
