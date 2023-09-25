import recruiterIdMethods from './Recruiter.id'
import RecruiterIdPositionMethods from './Recruiter.id.positions'

export const RecruiterServices = {
  id: {
    ...recruiterIdMethods,
    positions: RecruiterIdPositionMethods,
  },
}

export * from './Recruiter.types'
