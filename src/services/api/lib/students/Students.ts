import { api, ApiResponseTypes } from 'services'

import { StudentTypes } from './Students.types'

const getAllStudents = async () => {
  return (await api.get<ApiResponseTypes<StudentTypes[]>>('/students')).data
    .data
}

export default {
  get: getAllStudents,
}
