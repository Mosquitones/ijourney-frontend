/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect, useMemo } from 'react'

import { FCWithChildren } from '@types'

import { useLocalStorage } from 'hooks'

import { AccessibilityContextTypes } from './Accessibility.context.types'
import { hexToRgba } from './utils'

export const AccessibilityContext = createContext(
  {} as AccessibilityContextTypes
)

const hexColor = `#${import.meta.env.VITE_APP_PRIMARY_COLOR}`

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
    }),
    [availableColors, color, setColor]
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export * from './Accessibility.context.types'
