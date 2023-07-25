import { api } from 'services'

import {
  AuthLoginPayloadTypes,
  AuthLoginResponseInputTypes,
  AuthLoginResponseTypes,
} from './Auth.types'

const postLogin = async (
  payload: AuthLoginPayloadTypes
): Promise<AuthLoginResponseTypes> => {
  const response = await api.post<AuthLoginResponseInputTypes>(
    `/fusionauth/login`,
    payload
  )

  return {
    ...response.data,
    fusionauthUserUuid: response.data.fusionauth_user_uuid,
    feideId: response.data.feide_id,
    feideIdToken: response.data.feide_id_token,
    feideAccessToken: response.data.feide_access_token,
    createdAt: response.data.created_at,
    updatedAt: response.data.updated_at,
    teacherType: response.data.teacher_type,
  }
}

const getValidatedToken = () => api.get(`/fusionauth/validateToken`)

const getLogout = () => api.get(`/logout`)

export default {
  post: postLogin,
  validateToken: getValidatedToken,
  logout: getLogout,
}
