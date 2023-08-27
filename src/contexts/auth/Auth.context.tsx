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
  AuthenticationServices,
  AuthLoginPayloadTypes,
  ROLES,
  UserInfoTypes,
  UserRoleTypes,
} from 'services'

import { AuthContextTypes } from './Auth.context.types'

export const AuthContext = createContext({} as AuthContextTypes)

export const useAuth = () => useContext(AuthContext)

const BASE_INFO: Pick<UserInfoTypes, 'createdAt' | 'updatedAt'> = {
  createdAt: new Date('2022-07-04T15:10:48.192Z'),
  updatedAt: new Date('2022-07-04T15:10:48.192Z'),
}

const CANDIDATE_DUMMY_USER: UserInfoTypes = {
  ...BASE_INFO,
  id: 0,
  name: 'Candidate',
  role: ROLES.CANDIDATE,
}

const RECRUITER_DUMMY_USER: UserInfoTypes = {
  ...BASE_INFO,
  id: 1,
  name: 'Recruiter',
  role: ROLES.RECRUITER,
}

const ADMIN_DUMMY_USER: UserInfoTypes = {
  ...BASE_INFO,
  id: 2,
  name: 'Admin',
  role: ROLES.ADMIN,
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

  const deleteSessionDateStorage = useCallback(() => {
    setSessionDateStorage(null)
  }, [setSessionDateStorage])

  const deleteUserSessionStorage = useCallback(() => {
    setUser(null)
  }, [setUser])

  const deleteAccessTokenCookie = useCallback(() => {
    removeCookie('access_token', {
      path: '/',
    })
  }, [removeCookie])

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

  const isUserRole = useMemo(() => {
    const check: AuthContextTypes['isUserRole'] = {
      admin: user?.role === ROLES.ADMIN,
      recruiter: user?.role === ROLES.RECRUITER,
      candidate: user?.role === ROLES.CANDIDATE,
      company: user?.role === ROLES.COMPANY,
    }

    return check
  }, [user?.role])

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

  const renderFunctions = useCallback(() => {
    setSessionDateStorage(new Date().getTime())
    setCookie('access_token', crypto.randomUUID(), {
      path: '/',
    })
  }, [setCookie, setSessionDateStorage])

  const signIn = useCallback(
    (payload: AuthLoginPayloadTypes) => {
      if (payload.loginId === 'candidate@ey.com') {
        setUser(CANDIDATE_DUMMY_USER)
        renderFunctions()
      } else if (payload.loginId === 'recruiter@ey.com') {
        setUser(RECRUITER_DUMMY_USER)
        renderFunctions()
      } else if (payload.loginId === 'admin@ey.com') {
        setUser(ADMIN_DUMMY_USER)
        renderFunctions()
      }
    },
    [renderFunctions, setUser]
  )

  const signOut = useCallback(() => {
    deleteSessionDateStorage()
    deleteAccessTokenCookie()
    deleteUserSessionStorage()
  }, [
    deleteAccessTokenCookie,
    deleteSessionDateStorage,
    deleteUserSessionStorage,
  ])

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
