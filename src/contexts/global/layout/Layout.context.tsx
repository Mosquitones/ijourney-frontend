import React, { createContext, useContext, useMemo } from 'react'

import { FCWithChildren } from '@types'
import { useAuth } from 'contexts/auth/Auth.context'

import { useNavItems } from './hooks'
import { LayoutContextTypes } from './Layout.context.types'

export const LayoutContext = createContext({} as LayoutContextTypes)

export const useLayout = () => useContext(LayoutContext)

export const LayoutContextWrapper: FCWithChildren = ({ children }) => {
  const { user } = useAuth()
  const navItems = useNavItems()

  const userNavItems = useMemo(
    () => (user?.userType ? navItems[user.userType] : null),
    [navItems, user?.userType]
  )

  const value = useMemo(
    () => ({
      userNavItems,
    }),
    [userNavItems]
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export * from './Layout.context.types'
