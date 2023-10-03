import {
  ApiResponseTypes,
  CandidatePayloadQueryTypes,
  UserTypes,
  api,
} from 'services'
import { makeQueryParams } from 'utils'

import { candidateQueryParams } from './utils/candidateQueryParams'

const findAll = async (params?: CandidatePayloadQueryTypes) => {
  const serverParams = candidateQueryParams(params)

  const { data: response } = await api.get<ApiResponseTypes<UserTypes[]>>(
    `/candidates${makeQueryParams(serverParams)}`
  )

  return response.data
}

export default {
  get: findAll,
}
