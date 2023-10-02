import { ApiResponseTypes, UserTypes, api } from 'services'

const findById = async (userId: UserTypes['id']) => {
  const { data: response } = await api.get<ApiResponseTypes<UserTypes>>(
    `/users/${userId}`
  )

  return response.data
}

export default {
  get: findById,
}
