import { PositionTypes } from '../../positions'

export interface CandidatePositionTypes extends PositionTypes {
  appliedAt?: string
  savedAt?: string
  candidatePositionId: number
}
