import { ApiResponseTypes, CandidatePositionTypes, api } from 'services'

const deleteById = async (
  candidatePositionId: CandidatePositionTypes['candidatePositionId']
) => {
  const { data: response } = await api.delete<
    ApiResponseTypes<CandidatePositionTypes>
  >(`/candidates/positions/${candidatePositionId}`)

  return response.data
}

export default {
  delete: deleteById,
}
