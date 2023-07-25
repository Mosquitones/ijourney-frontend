import studentsMethods from './Students'
import studentsIdMethods from './Students.id'
import userGroupsMethods from './Students.id.user-group'
import studentsPaginated from './Students.paginated'

export const StudentServices = {
  ...studentsMethods,
  id: {
    userGroups: {
      ...userGroupsMethods,
    },
    ...studentsIdMethods,
  },
  ...studentsPaginated,
}

export * from './Students.types'
