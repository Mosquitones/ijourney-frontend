import { ApiResponseTypes, CandidatePositionTypes, api } from 'services'

import {
  CandidatePositionParamTypes,
  CandidatePositionPhasePayloadTypes,
} from './Positions.phases.types'

const update = async (payload: CandidatePositionParamTypes) => {
  const newPayload: CandidatePositionPhasePayloadTypes = {
    id: payload.candidatePositionId,
    newPhaseIndex: payload.newPhaseIndex,
  }

  const { data: response } = await api.put<
    ApiResponseTypes<CandidatePositionTypes>
  >(`/candidates/positions/phases`, newPayload)

  return response.data
}

export default {
  put: update,
}
