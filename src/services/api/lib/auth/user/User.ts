import { api } from 'services'

import { UserTypes } from './User.types'

const getUserFusionAuthInfo = async (token: string) =>
  api
    .get<UserTypes>(`/api/user`, {
      baseURL: import.meta.env.VITE_FUSIONAUTH_DEV_API_URL,
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)

export default {
  userFusionAuthInfo: getUserFusionAuthInfo,
}
