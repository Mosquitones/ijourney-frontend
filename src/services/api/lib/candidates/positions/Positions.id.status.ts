import { ApiResponseTypes, CandidatePositionTypes, api } from 'services'

import { CandidatePositionStatusTypes } from './Positions.id.status.types'

const findById = async (
  candidatePositionId: CandidatePositionTypes['candidatePositionId']
) => {
  const { data: response } = await api.get<
    ApiResponseTypes<CandidatePositionStatusTypes>
  >(`/candidates/positions/${candidatePositionId}/status`)

  return response.data
}

export default {
  get: findById,
}
