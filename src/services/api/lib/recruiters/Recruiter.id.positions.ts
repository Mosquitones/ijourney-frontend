import { ApiResponseTypes, api } from 'services'

import { RecruiterTypes } from './Recruiter.types'

const findById = async (recruiterId: RecruiterTypes['id']) => {
  const { data: response } = await api.get<ApiResponseTypes<RecruiterTypes>>(
    `/recruiters/${recruiterId}/positions`
  )

  return response.data
}

export default {
  get: findById,
}
