import { getPaletteColors } from 'common/theme/palette/utils'

import { ColorTypes } from '../../Accessibility.context.types'

export const useColors = () => {
  const COLORS: ColorTypes[] = [
    {
      id: 'red',
      hex: '#f80d0d',
      paletteColor: getPaletteColors('#f80d0d'),
    },
    {
      id: 'pink',
      hex: '#f80d96',
      paletteColor: getPaletteColors('#f80d96'),
    },
    {
      id: 'purple',
      hex: '#a50df8',
      paletteColor: getPaletteColors('#a50df8'),
    },
    {
      id: 'blue',
      hex: '#0d28f8',
      paletteColor: getPaletteColors('#0d28f8'),
    },
    {
      id: 'cyan',
      hex: '#0ddcf8',
      paletteColor: getPaletteColors('#0ddcf8'),
    },
    {
      id: 'teal',
      hex: '#0df867',
      paletteColor: getPaletteColors('#0df867'),
    },
    {
      id: 'green',
      hex: '#a5f80d',
      paletteColor: getPaletteColors('#a5f80d'),
    },
    {
      id: 'yellow',
      hex: `#${import.meta.env.VITE_APP_PRIMARY_COLOR}`,
      paletteColor: getPaletteColors(
        `#${import.meta.env.VITE_APP_PRIMARY_COLOR}`
      ),
    },
  ]

  return COLORS
}
