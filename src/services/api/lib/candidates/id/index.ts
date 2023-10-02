import candidateIdMethods from './Id'
import candidateIdCourseIdCompleteMethods from './Id.courses.id.complete'
import candidateIdPositionMethods from './Id.positions'
import candidateIdPositionArchiveMethods from './Id.positions.archived'
import candidateIdPositionSavedMethods from './Id.positions.saved'

export const CandidateIdServices = {
  ...candidateIdMethods,
  courses: {
    id: {
      complete: candidateIdCourseIdCompleteMethods,
    },
  },
  positions: {
    ...candidateIdPositionMethods,
    saved: candidateIdPositionSavedMethods,
    archived: candidateIdPositionArchiveMethods,
  },
}

export * from './Id.positions.types'
