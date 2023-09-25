import { ApiResponseTypes, UserTypes, api } from 'services'

import { RegisterCandidatePayloadTypes } from './Register.types'

const create = async (payload: RegisterCandidatePayloadTypes) => {
  const { data: response } = await api.post<ApiResponseTypes<UserTypes>>(
    `/candidates/register`,
    payload
  )

  return response.data
}

export default {
  post: create,
}
