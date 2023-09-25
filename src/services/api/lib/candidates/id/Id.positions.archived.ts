import { ApiResponseTypes, CandidateTypes, api } from 'services'

import { CandidatePositionTypes } from './Id.positions.types'

const findById = async (candidateId: CandidateTypes['id']) => {
  const { data: response } = await api.get<
    ApiResponseTypes<CandidatePositionTypes[]>
  >(`/candidates/${candidateId}/positions/archived`)

  return response.data
}

export default {
  get: findById,
}
