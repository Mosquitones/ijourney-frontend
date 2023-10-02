import { UserTypes } from '../Users.types'

export type LoginPayloadTypes = {
  email: UserTypes['email']
  password: UserTypes['password']
}
