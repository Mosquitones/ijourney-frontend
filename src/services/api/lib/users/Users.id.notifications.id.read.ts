import { ApiResponseTypes, UserTypes, api } from 'services'

import {
  NotificationResponseTypes,
  NotificationTypes,
} from './Users.id.notifications.types'

const readById = async (
  userId: UserTypes['id'],
  notificationId: NotificationTypes['id']
) => {
  const { data: response } = await api.get<
    ApiResponseTypes<NotificationResponseTypes>
  >(`/users/${userId}/notifications/${notificationId}/read`)

  return response.data
}

export default {
  post: readById,
}
