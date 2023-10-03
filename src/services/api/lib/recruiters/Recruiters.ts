import {
  ApiResponseTypes,
  RecruiterPayloadQueryTypes,
  UserTypes,
  api,
} from 'services'
import { makeQueryParams } from 'utils'

import { recruiterQueryParams } from './utils/recruiterQueryParams'

const findAll = async (params?: RecruiterPayloadQueryTypes) => {
  const serverParams = recruiterQueryParams(params)

  const { data: response } = await api.get<ApiResponseTypes<UserTypes[]>>(
    `/recruiters${makeQueryParams(serverParams)}`
  )

  return response.data
}

export default {
  get: findAll,
}
