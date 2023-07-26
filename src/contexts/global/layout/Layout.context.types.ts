import { Dispatch, SetStateAction } from 'react'

import { UseDisclosureTypes } from 'hooks'

export interface LayoutContextTypes {
  isPageLoading: boolean
  setIsPageLoading: Dispatch<
    SetStateAction<LayoutContextTypes['isPageLoading']>
  >
  asideMenuHandlers: UseDisclosureTypes
  scrollInformation: {
    position: number
    percentage: number
    atTop: boolean
    atBottom: boolean
  }
  scrollTo: (x?: number, y?: number) => void
}
