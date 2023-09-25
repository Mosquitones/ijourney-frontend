import { CandidatePositionTypes, PositionTypes } from 'services'

export interface PositionTabTemplatePropTypes {
  positions?: (CandidatePositionTypes | PositionTypes)[]
  variant?: 'saved' | 'default'
}
