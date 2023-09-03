import { ApiResponseTypes, UserTypes, api } from 'services'

import { LoginPayloadTypes } from './Login.types'

const login = async (payload: LoginPayloadTypes) => {
  const response = await api.post<ApiResponseTypes<UserTypes>>(
    `/users/login`,
    payload,
    {
      withCredentials: false,
    }
  )

  return response.data.body.data
}

export default {
  post: login,
}
