import { ApiResponseTypes, api } from 'services'
import { makeQueryParams } from 'utils'

import {
  PositionPayloadQueryTypes,
  PositionRegisterPayloadTypes,
  PositionTypes,
} from './Positions.types'
import { positionQueryParams } from './utils/positionQueryParams'

const findAll = async (params?: PositionPayloadQueryTypes) => {
  const serverParams = positionQueryParams(params)

  const { data: response } = await api.get<ApiResponseTypes<PositionTypes[]>>(
    `/positions${makeQueryParams(serverParams)}`
  )

  return response.data
}

const findById = async (positionId: number | string) => {
  const { data: response } = await api.get<ApiResponseTypes<PositionTypes>>(
    `/positions/${positionId}`
  )

  return response.data
}

const create = async (payload: PositionRegisterPayloadTypes) => {
  const { data: response } = await api.post<ApiResponseTypes<PositionTypes>>(
    `/positions/register`,
    payload
  )

  return response.data
}

const update = async (payload: Partial<PositionRegisterPayloadTypes>) => {
  const { data: response } = await api.put<ApiResponseTypes<PositionTypes>>(
    `/positions/update`,
    payload
  )

  return response.data
}

export default {
  findAll,
  findById,
  post: create,
  put: update,
}
