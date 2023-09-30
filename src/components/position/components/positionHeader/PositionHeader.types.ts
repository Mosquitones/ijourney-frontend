import { ChipListPropTypes } from 'components'
import { PositionTypes } from 'services'

export interface PositionHeaderPropTypes {
  title: string
  titleEndAdornment?: React.ReactNode
  chips: ChipListPropTypes['chips']
  positionId: PositionTypes['id']
}
