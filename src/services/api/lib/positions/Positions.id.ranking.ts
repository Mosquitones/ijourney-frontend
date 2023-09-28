import {
  ApiResponseTypes,
  PhaseTypes,
  PositionRankingTypes,
  PositionTypes,
  api,
} from 'services'
import { makeQueryParams } from 'utils'

type PositionRankingParams = {
  currentPhaseIndex: PhaseTypes['sequenceIndex']
}

const findAll = async (
  positionId: PositionTypes['id'],
  params?: PositionRankingParams
) => {
  const { data: response } = await api.get<
    ApiResponseTypes<PositionRankingTypes[]>
  >(
    `/positions/${positionId}/ranking${makeQueryParams<PositionRankingParams>(
      params
    )}`
  )

  return response.data
}

export default {
  findAll,
}
