import { DialogProps } from '@mui/material'

import { PositionTypes } from 'services'

export interface PositionModalHandlerPropTypes extends DialogProps {
  position: PositionTypes | null
}
