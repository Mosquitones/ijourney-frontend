import { ApiResponseTypes, api } from 'services'

import { PositionRegisterPayloadTypes, PositionTypes } from './Position.types'

const findAll = async () => {
  const { data: response } = await api.get<ApiResponseTypes<PositionTypes[]>>(
    `/positions`
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

export default {
  findAll,
  findById,
  post: create,
}
