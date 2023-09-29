import { COMPANY_ENUM } from '@types'

import { ApiResponseTypes, api } from 'services'

import { CompanyReportTypes } from './Companies.id.recruiters.report.types'

const findById = async () => {
  const { data: response } = await api.get<
    ApiResponseTypes<CompanyReportTypes>
  >(`/companies/${COMPANY_ENUM.ID}/recruiters/positions/report`)

  return response.data
}

export default {
  get: findById,
}
