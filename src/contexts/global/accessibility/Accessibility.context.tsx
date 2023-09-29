/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import { FCWithChildren } from '@types'

import { useLocalStorage } from 'hooks'

import { AccessibilityContextTypes } from './Accessibility.context.types'
import { hexToRgba } from './utils'

export const AccessibilityContext = createContext(
  {} as AccessibilityContextTypes
)

const hexColor = `#${import.meta.env.VITE_APP_PRIMARY_COLOR}`
const INITIAL_FONT_SIZE = 8

export const useAccessibility = () => useContext(AccessibilityContext)

export const GET_PRIMARY_COLOR_IN_HEX = () => hexToRgba(hexColor)
export const AccessibilityContextWrapper: FCWithChildren = ({ children }) => {
  const [color, setColor] = useLocalStorage<AccessibilityContextTypes['color']>(
    'app_main_color',
    {
      rgba: GET_PRIMARY_COLOR_IN_HEX(),
      hex: hexColor,
    }
  )
  const [fontSize, setFontSize] = useLocalStorage<number>(
    'app_main_font',
    INITIAL_FONT_SIZE
  )

  const increaseFontSize = useCallback(
    // it's strange but it's working xD
    () => setFontSize(fontSize - 1),
    [fontSize, setFontSize]
  )
  const decreaseFontSize = useCallback(
    // it's strange but it's working xD
    () => setFontSize(fontSize + 1),
    [fontSize, setFontSize]
  )

  const resetFontSize = useCallback(
    () => setFontSize(INITIAL_FONT_SIZE),
    [setFontSize]
  )

  const isFontSizeSameAsInitial = fontSize === INITIAL_FONT_SIZE

  const htmlFontSize = (62.5 / 100) * fontSize * 2

  const availableColors = useMemo(
    () => [
      '#f89e0d',
      `#f7ca0e`,
      '#a5f80d',
      '#2ECA72',
      '#0ddcf8',
      '#0d96f8',
      '#0d28f8',
      '#a50df8',
      '#f80d96',
      '#f80d0d',
    ],
    []
  )

  const value = useMemo(
    () => ({
      color,
      setColor,
      availableColors,
      htmlFontSize,
      fontSize,
      fontSizeHandlers: {
        increase: increaseFontSize,
        decrease: decreaseFontSize,
        reset: resetFontSize,
      },
      isFontSizeSameAsInitial,
    }),
    [
      availableColors,
      color,
      decreaseFontSize,
      fontSize,
      htmlFontSize,
      increaseFontSize,
      resetFontSize,
      setColor,
      isFontSizeSameAsInitial,
    ]
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export * from './Accessibility.context.types'
