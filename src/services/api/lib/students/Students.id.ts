import { api, ApiResponseTypes } from 'services'

import { StudentTypes } from './Students.types'

const getStudentById = async (id: number) => {
  return (await api.get<ApiResponseTypes<StudentTypes>>(`/students/${id}`)).data
    .data
}

export default {
  get: getStudentById,
}
