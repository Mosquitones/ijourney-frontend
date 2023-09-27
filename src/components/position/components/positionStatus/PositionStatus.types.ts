import { CandidatePositionTypes, PhaseTypes } from 'services'

export interface PositionStatusPropTypes {
  title?: string
  phases?: PhaseTypes[]
  currentPhaseIndex: CandidatePositionTypes['currentPhaseIndex']
}
