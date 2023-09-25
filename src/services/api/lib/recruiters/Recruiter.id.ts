import { ApiResponseTypes, api } from 'services'

import {
  RecruiterRegisterPayloadTypes,
  RecruiterTypes,
} from './Recruiter.types'

const create = async (payload: RecruiterRegisterPayloadTypes) => {
  const { data: response } = await api.post<ApiResponseTypes<RecruiterTypes>>(
    `/recruiters/register`,
    payload
  )

  return response.data
}

const findById = async (recruiterId: RecruiterTypes['id']) => {
  const { data: response } = await api.get<ApiResponseTypes<RecruiterTypes>>(
    `/recruiters/${recruiterId}`
  )

  return response.data
}

export default {
  get: findById,
  post: create,
}
