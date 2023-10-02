import { NotificationTypes } from 'services'

export interface NotificationItemPropTypes {
  notification: NotificationTypes
  refetchNotifications: () => void
}
