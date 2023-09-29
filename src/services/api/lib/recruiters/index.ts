import recruiterIdMethods from './Recruiters.id'
import recruiterIdPositionMethods from './Recruiters.id.positions'
import recruiterIdPositionsArchivedMethods from './Recruiters.Id.positions.archived'

export const RecruiterServices = {
  id: {
    ...recruiterIdMethods,
    positions: {
      ...recruiterIdPositionMethods,
      archived: recruiterIdPositionsArchivedMethods,
    },
  },
}

export * from './Recruiters.types'
