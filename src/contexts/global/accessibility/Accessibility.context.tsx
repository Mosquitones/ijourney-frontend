import React, { createContext, useContext, useMemo } from 'react'

import { FCWithChildren } from '@types'

import { useLocalStorage } from 'hooks'
import { hexToRgba } from 'utils'

import { AccessibilityContextTypes } from './Accessibility.context.types'

export const AccessibilityContext = createContext(
  {} as AccessibilityContextTypes
)

export const useAccessibility = () => useContext(AccessibilityContext)

export const AccessibilityContextWrapper: FCWithChildren = ({ children }) => {
  const hexColor = `#${import.meta.env.VITE_APP_PRIMARY_COLOR}`

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

  const [color, setColor] = useLocalStorage<AccessibilityContextTypes['color']>(
    'app_main_color',
    {
      rgba: hexToRgba(hexColor),
      hex: hexColor,
    }
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
