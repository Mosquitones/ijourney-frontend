import { AxiosError } from 'axios'
import { UseMutationResult } from 'react-query'

import {
  ApiResponseTypes,
  LoginPayloadTypes,
  UserTypes,
  UserRoleTypes,
} from 'services'

type _UserInfoQueryTypes = UseMutationResult<
  ApiResponseTypes<UserTypes>,
  AxiosError<ApiResponseTypes<unknown>, unknown>,
  void,
  unknown
>

export interface AuthContextTypes {
  user: UserTypes | null
  cookies: {
    accessToken?: string
  }
  isUserRole: { [key in UserRoleTypes]: boolean }
  // userInfoQuery: UserInfoQueryTypes
  isUserAuthenticated: boolean
  isLoggingIn: boolean
  signIn: (payload: LoginPayloadTypes) => void
  signOut: () => void
}
