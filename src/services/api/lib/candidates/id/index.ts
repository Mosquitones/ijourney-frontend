import candidateIdMethods from './Id'
import candidateIdPositionMethods from './Id.positions'
import candidateIdPositionArchiveMethods from './Id.positions.archived'
import candidateIdPositionSavedMethods from './Id.positions.saved'

export const CandidateIdServices = {
  ...candidateIdMethods,
  positions: {
    ...candidateIdPositionMethods,
    saved: candidateIdPositionSavedMethods,
    archived: candidateIdPositionArchiveMethods,
  },
}

export * from './Id.positions.types'
