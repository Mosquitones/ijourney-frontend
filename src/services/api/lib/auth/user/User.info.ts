import { api, ApiResponseTypes } from 'services'

import { UserInfoTypes } from './User.types'

const getUserInfo = async () => {
  const response = await api.get<ApiResponseTypes<UserInfoTypes>>(`/user/info`)
  return response.data
}

export default {
  userInfo: getUserInfo,
}
