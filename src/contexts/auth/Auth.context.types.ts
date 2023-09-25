import { AxiosError } from 'axios'
import { UseMutationResult } from 'react-query'

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

export interface AuthContextTypes {
  user: UserTypes | null
  cookies: {
    accessToken?: string
  }
  isUserRole: { [key in UserTypes['userType']]: boolean }
  isUserAuthenticated: boolean
  signIn: (payload: LoginPayloadTypes) => void
  isSigningIn: boolean
  signUp: (payload: RegisterCandidatePayloadTypes) => void
  isSigningUp: boolean
  signOut: () => void
}
