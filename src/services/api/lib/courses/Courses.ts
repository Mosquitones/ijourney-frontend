import { ApiResponseTypes, CourseTypes, api } from 'services'
import { makeQueryParams } from 'utils'

export interface CoursePayloadQueryTypes {
  candidateId: string | null
}

const findAll = async (params?: CoursePayloadQueryTypes) => {
  const { data: response } = await api.get<ApiResponseTypes<CourseTypes[]>>(
    `/courses${makeQueryParams(params)}`
  )

  return response.data
}

export default {
  get: findAll,
}
