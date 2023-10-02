import { LoginServices } from './login'
import userIdMethods from './Users.id'

export const UserServices = {
  id: userIdMethods,
  login: LoginServices,
}

export * from './Users.types'
export * from './login'
