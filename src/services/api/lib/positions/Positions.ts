import { ApiResponseTypes, api } from 'services'

import { PositionTypes } from './Position.types'

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

export default {
  findAll,
  findById,
}
