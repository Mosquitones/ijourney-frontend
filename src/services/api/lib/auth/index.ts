import authMethods from './Auth'
import { UserServices } from './user'

export const AuthenticationServices = {
  ...authMethods,
  ...UserServices,
}

export * from './Auth.types'
export * from './user'
