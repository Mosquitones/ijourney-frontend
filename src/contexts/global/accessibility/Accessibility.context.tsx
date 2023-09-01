/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { FCWithChildren } from '@types'
import { getPaletteColors } from 'common/theme/palette/utils'
import { useAuth } from 'contexts/auth/Auth.context'

import { useDebounce, useLocalStorage } from 'hooks'

import {
  ColorTypes,
  AccessibilityContextTypes,
} from './Accessibility.context.types'
import { useColors } from './hooks'

export const AccessibilityContext = createContext(
  {} as AccessibilityContextTypes
)

export const useAccessibility = () => useContext(AccessibilityContext)

export const AccessibilityContextWrapper: FCWithChildren = ({ children }) => {
  const colors = useColors()

  const DEFAULT_COLOR = colors[colors.length - 1]

  const [appPaletteColors, setAppPaletteColors] = useLocalStorage<
    typeof DEFAULT_COLOR
  >('palette_color', DEFAULT_COLOR)

  const [appColor, setAppColor] = useState<(typeof appPaletteColors)['id']>(
    appPaletteColors.id
  )

  useEffect(() => {
    const foundColor = colors.find((color) => color.id === appColor)
    if (foundColor && foundColor.id !== appPaletteColors.id) {
      setAppPaletteColors(foundColor)
    }
  }, [appColor, appPaletteColors.id, colors, setAppPaletteColors])

  const value = useMemo(
    () => ({
      appPaletteColors,
      appColor,
      colors,
      setAppColor,
    }),
    [appColor, appPaletteColors, colors]
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export * from './Accessibility.context.types'
