import { ElementType } from 'react'

import { UseDisclosureTypes } from 'hooks'

export interface NavItemTypes {
  label: string
  path: string
  isDefaultPath?: boolean
  icon: ElementType
  filledIcon?: ElementType
  onClick?: () => void
}

export interface LeftNavigationPropTypes {
  items: NavItemTypes[]
  dialogHandlers: UseDisclosureTypes
}
