import { ApiResponseTypes, CandidateTypes, PositionTypes, api } from 'services'

const findAll = async (candidateId: CandidateTypes['id']) => {
  const { data: response } = await api.get<ApiResponseTypes<PositionTypes[]>>(
    `/positions/candidates/${candidateId}`
  )

  return response.data
}

export default {
  get: findAll,
}
