import { EnumValueTypes, ROLE_ENUM } from '@types'
import { AxiosError } from 'axios'
import { MutateOptions, UseMutationResult } from 'react-query'

import {
  ApiResponseTypes,
  LoginPayloadTypes,
  UserTypes,
  RegisterCandidatePayloadTypes,
} from 'services'

type _UserInfoQueryTypes = UseMutationResult<
  ApiResponseTypes<UserTypes>,
  AxiosError<ApiResponseTypes<unknown>, unknown>,
  void,
  unknown
>

type UserRoleTypes = UserTypes['userType'] | 'SUPER_ADMIN'

export interface AuthContextTypes {
  user: UserTypes | null
  cookies: {
    accessToken?: string
  }
  isUserRole: { [key in UserRoleTypes]: boolean }
  userRole: EnumValueTypes<typeof ROLE_ENUM>
  isUserAuthenticated: boolean
  signIn: (payload: LoginPayloadTypes) => void
  isSigningIn: boolean
  signUp: (
    payload: RegisterCandidatePayloadTypes,
    options?:
      | MutateOptions<
          UserTypes,
          AxiosError<ApiResponseTypes<unknown>, unknown>,
          RegisterCandidatePayloadTypes,
          unknown
        >
      | undefined
  ) => void
  isSigningUp: boolean
  signOut: () => void
  userId: UserTypes['id']
}
