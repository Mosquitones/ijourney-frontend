import userMethods from './User'
import userInfo from './User.info'

export const UserServices = {
  get: {
    ...userMethods,
    ...userInfo,
  },
}

export * from './User.types'
