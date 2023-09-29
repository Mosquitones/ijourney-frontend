import { ApiResponseTypes, PositionTypes, api } from 'services'

const create = async (positionId: PositionTypes['id']) => {
  const { data: response } = await api.post<ApiResponseTypes<PositionTypes>>(
    `/positions/${positionId}/archived/register`
  )

  return response.data
}

export default {
  post: create,
}
