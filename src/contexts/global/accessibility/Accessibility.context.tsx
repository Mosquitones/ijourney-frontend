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
    }),
    [color, setColor]
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export * from './Accessibility.context.types'
