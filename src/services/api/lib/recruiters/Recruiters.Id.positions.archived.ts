import { ApiResponseTypes, PositionTypes, RecruiterTypes, api } from 'services'

const findAll = async (recruiterId: RecruiterTypes['id']) => {
  const { data: response } = await api.get<ApiResponseTypes<PositionTypes[]>>(
    `/recruiters/${recruiterId}/positions/archived`
  )

  return response.data
}

export default {
  get: findAll,
}
