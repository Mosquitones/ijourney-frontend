export interface NotificationTypes {
  id: number
  title: string
  description: string
  creationDate: string
  read: boolean
}

export interface NotificationResponseTypes {
  notifications: NotificationTypes[]
  totalUnreadNotifications: number
}
