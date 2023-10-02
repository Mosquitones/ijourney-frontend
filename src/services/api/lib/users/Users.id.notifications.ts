import { ApiResponseTypes, UserTypes, api } from 'services'

import { NotificationResponseTypes } from './Users.id.notifications.types'

const findAll = async (userId: UserTypes['id']) => {
  const { data: response } = await api.get<
    ApiResponseTypes<NotificationResponseTypes>
  >(`/users/${userId}/notifications`)

  return response.data
}

const deleteAll = async (userId: UserTypes['id']) => {
  const { data: response } = await api.delete<
    ApiResponseTypes<NotificationResponseTypes>
  >(`/users/${userId}/notifications`)

  return response.data
}

export default {
  get: findAll,
  delete: deleteAll,
}
