import {
  ApiResponseTypes,
  PositionRankingTypes,
  PositionTypes,
  api,
} from 'services'

const findAll = async (positionId: PositionTypes['id']) => {
  const { data: response } = await api.get<
    ApiResponseTypes<PositionRankingTypes[]>
  >(`/positions/${positionId}/ranking`)

  return response.data
}

export default {
  findAll,
}
