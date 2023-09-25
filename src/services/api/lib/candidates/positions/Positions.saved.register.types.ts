import { CandidateTypes, PositionTypes } from 'services'

export interface RegisterCandidateSavedPositionPayloadTypes {
  candidateId: CandidateTypes['id']
  positionId: PositionTypes['id']
}
