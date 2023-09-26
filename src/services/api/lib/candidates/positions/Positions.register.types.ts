import { EnumValueTypes, PHASE_STATUS_TYPE_ENUM } from '@types'

import { CandidateTypes, PositionTypes } from 'services'

export interface CandidatePositionRegisterPayloadTypes {
  candidateId: CandidateTypes['id']
  positionId: PositionTypes['id']
}

export interface CandidatePositionRegisterTypes {
  id: number
  points: number
  positionId: number
  candidateId: number
  currentPhaseId: number
  positionStatus: EnumValueTypes<typeof PHASE_STATUS_TYPE_ENUM>
  archived: boolean
}
