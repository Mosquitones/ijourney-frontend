import { ApiResponseTypes, api } from 'services'

import { RecruiterReportTypes } from './Recruiters.id.reports.types'
import { RecruiterTypes } from './Recruiters.types'

const findById = async (recruiterId: RecruiterTypes['id']) => {
  const { data: response } = await api.get<
    ApiResponseTypes<RecruiterReportTypes>
  >(`/recruiters/${recruiterId}/reports`)

  return response.data
}

export default {
  get: findById,
}
