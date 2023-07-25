import { AxiosError } from 'axios'
import { UseMutationResult } from 'react-query'

import {
  ApiResponseTypes,
  AuthLoginPayloadTypes,
  UserInfoTypes,
} from 'services'

type UserInfoQueryTypes = UseMutationResult<
  ApiResponseTypes<UserInfoTypes>,
  AxiosError<ApiResponseTypes<unknown>, unknown>,
  void,
  unknown
>

export interface AuthContextTypes {
  user: UserInfoTypes | null
  cookies: {
    accessToken?: string
  }
  userInfoQuery: UserInfoQueryTypes
  isUserAuthenticated: boolean
  isLoggingIn: boolean
  signIn: (payload: AuthLoginPayloadTypes) => void
  signOut: () => void
}
