import React from 'react'

import { PHASE_STATUS_TYPE_LIST } from '@types'

import { StatusIndicatorStyles } from './PhaseStatusIndicator.styles'
import { PhaseStatusIndicatorPropTypes } from './PhaseStatusIndicator.types'

export const PhaseStatusIndicator: React.FC<PhaseStatusIndicatorPropTypes> = ({
  phaseStatusType,
  chipProps,
}) => {
  const phaseStatus =
    PHASE_STATUS_TYPE_LIST.find(
      (phaseStatus) => phaseStatus.value === phaseStatusType
    ) || PHASE_STATUS_TYPE_LIST[0]

  return (
    <StatusIndicatorStyles
      {...chipProps}
      phaseStatusType={phaseStatusType}
      label={phaseStatus.label}
    />
  )
}
