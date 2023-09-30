import { ChipProps } from '@mui/material'
import { EnumValueTypes, PHASE_STATUS_TYPE_ENUM } from '@types'

export interface PhaseStatusIndicatorPropTypes {
  phaseStatusType: EnumValueTypes<typeof PHASE_STATUS_TYPE_ENUM>
  chipProps?: ChipProps
}
