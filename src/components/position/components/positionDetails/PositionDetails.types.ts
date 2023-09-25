import { RecruiterTypes } from 'services'

export interface PositionDetailsPropTypes {
  title?: string
  recruiter?: RecruiterTypes
  appliedAt?: Date
  expireAt?: Date
  createdAt?: Date
  savedAt?: Date
}
