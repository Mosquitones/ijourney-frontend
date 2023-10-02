import { ApiResponseTypes, UserTypes, api } from 'services'

import {
  NotificationResponseTypes,
  NotificationTypes,
} from './Users.id.notifications.types'

const deleteNotification = async (
  userId: UserTypes['id'],
  notificationId: NotificationTypes['id']
) => {
  const { data: response } = await api.delete<
    ApiResponseTypes<NotificationResponseTypes>
  >(`/users/${userId}/notifications/${notificationId}`)

  return response.data
}

export default {
  delete: deleteNotification,
}
