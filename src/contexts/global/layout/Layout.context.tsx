import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { FCWithChildren } from '@types'

import { useDisclosure } from 'hooks'

import { LayoutContextTypes } from './Layout.context.types'

export const LayoutContext = createContext({} as LayoutContextTypes)

export const useLayout = () => useContext(LayoutContext)

export const LayoutContextWrapper: FCWithChildren = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [scrollInformation, setScrollInformation] = useState({
    position: 0,
    percentage: 0,
    atTop: true,
    atBottom: false,
  })

  const asideMenuHandlers = useDisclosure()

  const handleScroll = useCallback(() => {
    const { scrollY, innerHeight } = window

    const percentage = Math.round(
      (scrollY / (document.body.offsetHeight - innerHeight)) * 100
    )

    setScrollInformation({
      position: scrollY,
      percentage,
      atTop: scrollY === 0,
      atBottom: percentage === 100,
    })
  }, [])
  const scrollTo = useCallback((x = 0, y = 0) => {
    const mainElement = document.getElementsByTagName('main')[0]

    mainElement.scrollTo(x, y)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const value = useMemo(
    () => ({
      isPageLoading,
      setIsPageLoading,
      asideMenuHandlers,
      scrollInformation,
      scrollTo,
    }),
    [isPageLoading, asideMenuHandlers, scrollInformation, scrollTo]
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export * from './Layout.context.types'
