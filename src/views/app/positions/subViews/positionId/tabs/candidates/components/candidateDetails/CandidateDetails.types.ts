import { CandidatePositionTypes } from 'services'

export interface CandidateDetailPropTypes {
  candidatePositionId?: CandidatePositionTypes['candidatePositionId']
  isOpen: boolean
  onClose: () => void
  refetchRanking?: () => void
}
