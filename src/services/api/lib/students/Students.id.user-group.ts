import { api } from 'services'

import { StudentTypes } from './Students.types'

const studentPostUserGroup = (studentId: number, userGroupId: number) => {
  return api.post<StudentTypes>(
    `/students/${studentId}/user-groups?userGroupId=${userGroupId}`
  )
}

const studentDeleteUserGroup = (studentId: number, userGroupId: number) => {
  return api.delete<StudentTypes>(
    `/students/${studentId}/user-groups?userGroupId=${userGroupId}`
  )
}

export default {
  post: studentPostUserGroup,
  delete: studentDeleteUserGroup,
}
