import { ChipListPropTypes } from 'components'

export interface PositionHeaderPropTypes {
  title: string
  titleEndAdornment?: React.ReactNode
  chips: ChipListPropTypes['chips']
}
