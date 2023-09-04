import { ChipProps } from '@mui/material'

export interface ChipListPropTypes {
  chips: {
    label: string
    variant: ChipProps['variant']
    color: ChipProps['color']
  }[]
}
