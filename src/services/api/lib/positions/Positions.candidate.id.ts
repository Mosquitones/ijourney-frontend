import {
  ApiResponseTypes,
  CandidateTypes,
  PositionPayloadQueryTypes,
  PositionTypes,
  api,
} from 'services'
import { makeQueryParams } from 'utils'

import { positionQueryParams } from './utils/positionQueryParams'

const findAll = async (
  candidateId: CandidateTypes['id'],
  params?: PositionPayloadQueryTypes
) => {
  const serverParams = positionQueryParams(params)

  const { data: response } = await api.get<ApiResponseTypes<PositionTypes[]>>(
    `/positions/candidates/${candidateId}${makeQueryParams(serverParams)}`
  )

  return response.data
}

export default {
  get: findAll,
}
