import candidateIdPositionMethods from './Id.positions'
import candidateIdPositionArchiveMethods from './Id.positions.archived'
import candidateIdPositionSavedMethods from './Id.positions.saved'

export const CandidateIdServices = {
  positions: {
    ...candidateIdPositionMethods,
    saved: candidateIdPositionSavedMethods,
    archived: candidateIdPositionArchiveMethods,
  },
}

export * from './Id.positions.types'
