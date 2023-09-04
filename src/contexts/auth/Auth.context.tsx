/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { AxiosError } from 'axios'
import { useFeedback } from 'contexts/global/Global.context'
import { useCookies } from 'react-cookie'
import { useMutation } from 'react-query'

import { useLocalStorage } from 'hooks'
import {
  ApiResponseTypes,
  ROLES,
  UserTypes,
  UserRoleTypes,
  UserServices,
} from 'services'

import { AuthContextTypes } from './Auth.context.types'

export const AuthContext = createContext({} as AuthContextTypes)

export const useAuth = () => useContext(AuthContext)

const BASE_INFO: Omit<
  UserTypes,
  'email' | 'password' | 'userType' | 'id' | 'fullName'
> = {
  companyId: 0,
  cpf: '',
  dateOfBirth: new Date(),
  gender: 'MALE',
  phoneNumber: '',
  imageUrl: '',
}

const CANDIDATE_DUMMY_USER: UserTypes = {
  ...BASE_INFO,
  id: 0,
  fullName: 'Candidate',
  userType: ROLES.CANDIDATE,
  email: 'candidate@ey.com',
  password: '123',
}

const RECRUITER_DUMMY_USER: UserTypes = {
  ...BASE_INFO,
  id: 1,
  fullName: 'Recruiter',
  userType: ROLES.RECRUITER,
  email: 'recruiter@ey.com',
  password: '123',
}

const COMPANY_DUMMY_USER: UserTypes = {
  ...BASE_INFO,
  id: 2,
  fullName: 'Company',
  userType: ROLES.COMPANY,
  email: 'company@ey.com',
  password: '123',
}

const ADMIN_DUMMY_USER: UserTypes = {
  ...BASE_INFO,
  id: 3,
  fullName: 'Admin',
  userType: ROLES.ADMIN,
  email: 'admin@ey.com',
  password: '123',
}

export const AuthContextWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<AuthContextTypes['user']>(
    'user',
    null
  )
  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
  const [sessionDateStorage, setSessionDateStorage] = useLocalStorage<
    number | null
  >('session_date', null)

  const { alert } = useFeedback()

  const isUserRole = useMemo(() => {
    const check: AuthContextTypes['isUserRole'] = {
      ADMIN: user?.userType === ROLES.ADMIN,
      RECRUITER: user?.userType === ROLES.RECRUITER,
      CANDIDATE: user?.userType === ROLES.CANDIDATE,
      COMPANY: user?.userType === ROLES.COMPANY,
    }

    return check
  }, [user?.userType])

  const loginQuery = useMutation({
    mutationKey: ['/users/login', { method: 'POST' }],
    mutationFn: UserServices.login.post,
    onSuccess: (user) => {
      setUser(user)
      setSessionDateStorage(new Date().getTime())
      setCookie('access_token', crypto.randomUUID(), {
        path: '/',
      })
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  // const revalidateTokenQuery = useMutation(
  //   ['/fusionauth/validateToken', { method: 'GET' }],
  //   AuthenticationServices.validateToken
  // )

  // const isLoggingIn = useMemo(
  //   () => fusionAuthLoginQuery.isLoading,
  //   [fusionAuthLoginQuery.isLoading]
  // )

  const isLoggingIn = loginQuery.isError
    ? false
    : loginQuery.isSuccess
    ? true
    : loginQuery.isLoading

  const isUserAuthenticated = useMemo(
    () => Boolean(sessionDateStorage && cookies.access_token),
    [sessionDateStorage, cookies.access_token]
  )

  const signIn: AuthContextTypes['signIn'] = useCallback(
    (payload) => {
      loginQuery.mutate(payload)
    },
    [loginQuery]
  )

  const signOut = useCallback(() => {
    setSessionDateStorage(null)
    setUser(null)
    removeCookie('access_token', {
      path: '/',
    })
  }, [removeCookie, setSessionDateStorage, setUser])

  const auth = useMemo(
    () => ({
      user,
      cookies: {
        accessToken: cookies.access_token,
      },
      // userInfoQuery,
      isUserAuthenticated,
      isUserRole,
      isLoggingIn,
      signIn,
      signOut,
    }),
    [
      user,
      cookies.access_token,
      isUserRole,
      // userInfoQuery,
      isUserAuthenticated,
      isLoggingIn,
      signIn,
      signOut,
    ]
  )

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
