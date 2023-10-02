import { ApiResponseTypes, UserTypes, api } from 'services'

import { NotificationResponseTypes } from './Users.id.notifications.types'

const readAllNotifications = async (userId: UserTypes['id']) => {
  const { data: response } = await api.post<
    ApiResponseTypes<NotificationResponseTypes>
  >(`/users/${userId}/notifications/read`)

  return response.data
}

export default {
  post: readAllNotifications,
}
