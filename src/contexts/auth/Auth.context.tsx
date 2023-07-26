/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
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
  AuthenticationServices,
  AuthLoginPayloadTypes,
  ROLES,
  UserInfoTypes,
} from 'services'
import { timeToMilliseconds } from 'utils'

import { AuthContextTypes } from './Auth.context.types'

export const AuthContext = createContext({} as AuthContextTypes)

export const useAuth = () => useContext(AuthContext)

const DUMMY_USER: UserInfoTypes = {
  id: 17,
  name: 'Dummy User',
  createdAt: new Date('2022-07-04T15:10:48.192Z'),
  updatedAt: new Date('2022-07-04T15:10:48.192Z'),
  roles: [ROLES.BACK_OFFICE],
  teacherType: 'TeacherManager',
  fusionauthId: '5139c950-bcdd-4ad0-9f2c-d998cd857357',
  fusionauthAccessToken: 'fake-fusion-auth-access-token',
  feideToken: 'fake-feide-auth-access-token',
}

const TWO_HOURS_IN_MILLISECONDS = timeToMilliseconds({ hours: 2 })

export const AuthContextWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextTypes['user']>(null)
  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
  const [sessionDateStorage, setSessionDateStorage] = useLocalStorage<
    number | null
  >('session_date', null)

  const { alert } = useFeedback()

  const deleteSessionDateStorage = () => {
    setSessionDateStorage(null)
  }

  const deleteAccessTokenCookie = () => {
    removeCookie('access_token', {
      path: '/',
    })
  }

  const logoutQuery = useMutation(
    ['/logout', { method: 'GET' }],
    AuthenticationServices.logout,
    {
      onSuccess: () => {
        deleteSessionDateStorage()
        deleteAccessTokenCookie()
      },
      onError: (error: AxiosError<unknown>) => {
        alert.showError(error.message)
      },
    }
  )

  // const userInfoQuery = useMutation(
  //   ['/user/info', { method: 'GET' }],
  //   AuthenticationServices.get.userInfo,
  //   {
  //     onSuccess: (response) => {
  //       setSessionDateStorage(new Date().getTime())
  //       setUser(response.data)
  //       setCookie('access_token', response.data.fusionauthAccessToken, {
  //         path: '/',
  //       })
  //     },
  //     onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
  //       alert.showError(error.response?.data.message || error.message)
  //       deleteSessionDateStorage()
  //     },
  //   }
  // )

  const fusionAuthLoginQuery = useMutation(
    ['/fusionauth/login', { method: 'POST' }],
    AuthenticationServices.post,
    {
      onSuccess: () => {
        // userInfoQuery.mutate()
      },
      onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
        alert.showError(error.response?.data.message || error.message)
      },
    }
  )

  // const revalidateTokenQuery = useMutation(
  //   ['/fusionauth/validateToken', { method: 'GET' }],
  //   AuthenticationServices.validateToken
  // )

  const isLoggingIn = useMemo(
    () => fusionAuthLoginQuery.isLoading,
    [fusionAuthLoginQuery.isLoading]
  )

  const isUserAuthenticated = useMemo(
    () => Boolean(sessionDateStorage && cookies.access_token),
    [sessionDateStorage, cookies.access_token]
  )

  const signIn = useCallback(
    (payload: AuthLoginPayloadTypes) => {
      fusionAuthLoginQuery.mutateAsync(payload)
    },
    [fusionAuthLoginQuery]
  )

  const signOut = useCallback(() => {
    logoutQuery.mutateAsync()
  }, [logoutQuery])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (cookies.access_token) {
  //       revalidateTokenQuery.mutateAsync()
  //     }
  //   }, TWO_HOURS_IN_MILLISECONDS)

  //   return () => clearInterval(interval)
  // }, [cookies.access_token, revalidateTokenQuery])

  const auth = useMemo(
    () => ({
      user,
      cookies: {
        accessToken: cookies.access_token,
      },
      // userInfoQuery,
      isUserAuthenticated,
      isLoggingIn,
      signIn,
      signOut,
    }),
    [
      user,
      cookies.access_token,
      // userInfoQuery,
      isUserAuthenticated,
      isLoggingIn,
      signIn,
      signOut,
    ]
  )

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
