import { ApiResponseTypes, api } from 'services'

import {
  CandidatePositionRegisterPayloadTypes,
  CandidatePositionRegisterTypes,
} from './Positions.register.types'

const create = async (payload: CandidatePositionRegisterPayloadTypes) => {
  const { data: response } = await api.post<
    ApiResponseTypes<CandidatePositionRegisterTypes>
  >(`/candidates/positions/register`, payload)

  return response.data
}

export default {
  post: create,
}
