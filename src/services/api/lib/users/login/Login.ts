import { ApiResponseTypes, UserTypes, api } from 'services'

import { LoginPayloadTypes } from './Login.types'

const login = async (payload: LoginPayloadTypes) => {
  const { data: axiosResponse } = await api.post<ApiResponseTypes<UserTypes>>(
    `/users/login`,
    payload
  )

  return axiosResponse.data
}

export default {
  post: login,
}
