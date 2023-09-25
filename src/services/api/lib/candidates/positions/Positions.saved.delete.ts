import { ApiResponseTypes, api } from 'services'

import { RegisterCandidateSavedPositionPayloadTypes } from './Positions.saved.register.types'

const deleteById = async (
  payload: RegisterCandidateSavedPositionPayloadTypes
) => {
  const { data: response } = await api.delete<ApiResponseTypes<null>>(
    `/candidates/${payload.candidateId}/positions/${payload.positionId}/saved`
  )

  return response.data
}

export default deleteById
