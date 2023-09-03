import { ApiResponseTypes, api } from 'services'

import { PositionTypes } from './Position.types'

const findAll = async () => {
  const response = await api.get<ApiResponseTypes<PositionTypes[]>>(
    `/positions`
  )

  return response.data.body.data
}

export default {
  findAll,
}
