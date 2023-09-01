/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { ThemeOptions } from '@mui/material'
import { FCWithChildren } from '@types'
import {
  MuiThemeWrapper,
  palette,
  MuiComponents as components,
  typography,
  mixins,
  breakpoints,
} from 'common/theme'
import { getPaletteColors } from 'common/theme/palette/utils'
import { useAuth } from 'contexts/auth/Auth.context'

import { useDebounce, useLocalStorage } from 'hooks'

import { useColors, useNavItems } from './hooks'
import { ColorTypes, LayoutContextTypes } from './Layout.context.types'

export const LayoutContext = createContext({} as LayoutContextTypes)

export const useLayout = () => useContext(LayoutContext)

const MuiTheme: ThemeOptions = {
  palette,
  components,
  typography,
  mixins,
  breakpoints,
}

export const LayoutContextWrapper: FCWithChildren = ({ children }) => {
  const { user } = useAuth()
  const navItems = useNavItems()
  const colors = useColors()

  const DEFAULT_COLOR = colors[colors.length - 1]

  const [theme, setTheme] = useState(MuiTheme)

  const [appColor, setAppColor] = useState(DEFAULT_COLOR.id)
  // console.log(palette.)
  // const

  // const [appPaletteColors, setAppPaletteColors] = useLocalStorage<
  //   typeof DEFAULT_COLOR
  // >('palette_color', DEFAULT_COLOR)

  // const [appColor, setAppColor] = useState<(typeof appPaletteColors)['id']>(
  //   appPaletteColors.id
  // )

  const userNavItems = useMemo(
    () => (user?.role ? navItems[user.role] : null),
    [navItems, user?.role]
  )

  // useEffect(() => {
  //   const foundColor = colors.find((color) => color.id === appColor)
  //   if (foundColor && foundColor.id !== appPaletteColors.id) {
  //     setAppPaletteColors(foundColor)
  //   }
  // }, [appColor, appPaletteColors.id, colors, setAppPaletteColors])

  useEffect(() => {
    const foundColor = colors.find((color) => color.id === appColor)
    if (foundColor && foundColor?.id !== appColor) {
      setTheme((theme) => ({
        ...theme,
        palette: {
          ...theme.palette,
          primary: getPaletteColors(foundColor.hex),
        },
      }))
    }
  }, [appColor, colors])

  const value = useMemo(
    () => ({
      userNavItems,
      setTheme,
      // appPaletteColors,
      appColor,
      colors,
      setAppColor,
    }),
    [
      appColor,
      // appPaletteColors,
      colors,
      userNavItems,
    ]
  )

  return (
    <LayoutContext.Provider value={value}>
      <MuiThemeWrapper theme={theme}>{children}</MuiThemeWrapper>
    </LayoutContext.Provider>
  )
}

export * from './Layout.context.types'
