import recruiterMethods from './Recruiters'
import recruiterIdMethods from './Recruiters.id'
import recruiterIdPositionMethods from './Recruiters.id.positions'
import recruiterIdPositionsArchivedMethods from './Recruiters.Id.positions.archived'
import recruiterIdReportMethods from './Recruiters.id.reports'

export const RecruiterServices = {
  ...recruiterMethods,
  id: {
    ...recruiterIdMethods,
    positions: {
      ...recruiterIdPositionMethods,
      archived: recruiterIdPositionsArchivedMethods,
    },
    reports: recruiterIdReportMethods,
  },
}

export * from './Recruiters.types'
