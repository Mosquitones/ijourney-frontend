import { ApiResponseTypes, PositionPayloadQueryTypes, api } from 'services'
import { makeQueryParams } from 'utils'

import { positionQueryParams } from '../positions/utils/positionQueryParams'

import { RecruiterTypes } from './Recruiter.types'

const findById = async (
  recruiterId: RecruiterTypes['id'],
  params?: PositionPayloadQueryTypes
) => {
  const serverParams = positionQueryParams(params)
  const { data: response } = await api.get<ApiResponseTypes<RecruiterTypes>>(
    `/recruiters/${recruiterId}/positions${makeQueryParams(serverParams)}`
  )

  return response.data
}

export default {
  get: findById,
}
