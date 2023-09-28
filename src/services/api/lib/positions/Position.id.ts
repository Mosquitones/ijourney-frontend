import { api, ApiResponseTypes, PositionTypes } from 'services'

const deleteById = async (positionId: PositionTypes['id']) => {
  const { data: response } = await api.delete<ApiResponseTypes<PositionTypes>>(
    `/positions/${positionId}`
  )

  return response.data
}

export default {
  delete: deleteById,
}
