import { ApiResponseTypes, CandidateTypes, PositionTypes, api } from 'services'

const findById = async (candidateId: CandidateTypes['id']) => {
  const { data: response } = await api.get<ApiResponseTypes<PositionTypes[]>>(
    `/candidates/${candidateId}/positions/saved`
  )

  return response.data
}

export default {
  get: findById,
}
