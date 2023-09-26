import { DialogProps } from '@mui/material'

import { PositionTypes, SkillTypes } from 'services'

export interface PositionModalHandlerPropTypes extends DialogProps {
  position?: PositionTypes
  refetchPositions: () => void
  skills: SkillTypes[]
}
