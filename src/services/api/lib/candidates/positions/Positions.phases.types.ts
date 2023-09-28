import { CandidatePositionTypes } from '../id'

export interface CandidatePositionParamTypes {
  candidatePositionId: CandidatePositionTypes['candidatePositionId']
  newPhaseIndex: number
}

export interface CandidatePositionPhasePayloadTypes {
  id: CandidatePositionTypes['candidatePositionId']
  newPhaseIndex: number
}
