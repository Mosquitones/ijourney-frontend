import { ApiResponseTypes, CandidateTypes, UserTypes, api } from 'services'

const findById = async (candidateId: CandidateTypes['id']) => {
  const { data: response } = await api.get<ApiResponseTypes<UserTypes>>(
    `/candidates/${candidateId}`
  )

  return response.data
}

export default {
  get: findById,
}
