import { LoginServices } from './login'
import userIdMethods from './Users.id'
import userIdNotificationsMethods from './Users.id.notifications'
import userIdNotificationIdMethods from './Users.id.notifications.id'
import userIdNotificationsIdReadMethods from './Users.id.notifications.id.read'
import userIdNotificationsReadMethods from './Users.id.notifications.read'

export const UserServices = {
  id: {
    ...userIdMethods,
    notifications: {
      ...userIdNotificationsMethods,
      read: userIdNotificationsReadMethods,
      id: {
        ...userIdNotificationIdMethods,
        read: userIdNotificationsIdReadMethods,
      },
    },
  },
  login: LoginServices,
}

export * from './Users.types'
export * from './Users.id.notifications.types'
export * from './login'
