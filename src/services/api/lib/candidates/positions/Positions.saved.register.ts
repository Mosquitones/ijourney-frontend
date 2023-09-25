import { ApiResponseTypes, api } from 'services'

import { RegisterCandidateSavedPositionPayloadTypes } from './Positions.saved.register.types'

const create = async (payload: RegisterCandidateSavedPositionPayloadTypes) => {
  const { data: response } = await api.post<ApiResponseTypes<null>>(
    `/candidates/positions/saved/register`,
    payload
  )

  return response.data
}

export default {
  post: create,
}
