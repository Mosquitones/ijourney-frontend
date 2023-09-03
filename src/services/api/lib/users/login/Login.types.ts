import { UserTypes } from '../User.types'

export type LoginPayloadTypes = {
  email: UserTypes['email']
  password: UserTypes['password']
}
