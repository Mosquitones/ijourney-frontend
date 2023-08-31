import { ElementType } from 'react'

import { FabProps } from '@mui/material'

export interface FloatingActionButtonPropTypes extends FabProps {
  icon: ElementType
  tooltip: string
}
