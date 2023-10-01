import { ApiResponseTypes, MentorTypes, api } from 'services'

const findAll = async () => {
  const { data: response } = await api.get<ApiResponseTypes<MentorTypes[]>>(
    `/mentors`
  )

  return response.data
}

export default {
  get: findAll,
}
