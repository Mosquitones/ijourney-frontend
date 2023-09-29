import { PositionTypes } from 'services'

export interface PositionCardTypes {
  href: string
  position: PositionTypes
  onEditClick?: () => void
  isArchived?: boolean
}
