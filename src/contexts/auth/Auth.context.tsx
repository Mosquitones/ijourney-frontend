/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { GENDER_ENUM, ROLE_ENUM } from '@types'
import { AxiosError } from 'axios'
import { useFeedback } from 'contexts/global/Global.context'
import { useCookies } from 'react-cookie'
import { useMutation } from 'react-query'

import { useLocalStorage } from 'hooks'
import {
  ApiResponseTypes,
  UserTypes,
  UserServices,
  CandidateServices,
} from 'services'

import { AuthContextTypes } from './Auth.context.types'

export const AuthContext = createContext({} as AuthContextTypes)

export const useAuth = () => useContext(AuthContext)

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
      ADMIN: user?.userType === ROLE_ENUM.ADMIN,
      RECRUITER: user?.userType === ROLE_ENUM.RECRUITER,
      CANDIDATE: user?.userType === ROLE_ENUM.CANDIDATE,
      COMPANY: user?.userType === ROLE_ENUM.COMPANY,
    }

    return check
  }, [user?.userType])

  const userRole = useMemo(
    () => (user?.userType ? user.userType : ROLE_ENUM.CANDIDATE),
    [user?.userType]
  )

  const signInQuery = useMutation({
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

  const isSigningIn = signInQuery.isError
    ? false
    : signInQuery.isSuccess
    ? true
    : signInQuery.isLoading

  const signUpQuery = useMutation({
    mutationKey: ['/candidates/register', { method: 'POST' }],
    mutationFn: CandidateServices.register.post,
    onSuccess: ({ email, password }) => {
      signInQuery.mutate({ email, password })
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const isSigningUp = signUpQuery.isError
    ? false
    : signUpQuery.isSuccess
    ? true
    : signUpQuery.isLoading

  const isUserAuthenticated = useMemo(
    () => Boolean(sessionDateStorage && cookies.access_token),
    [sessionDateStorage, cookies.access_token]
  )

  const userId = user?.id ? user.id : -1

  const signIn: AuthContextTypes['signIn'] = useCallback(
    (payload) => {
      signInQuery.mutate(payload)
    },
    [signInQuery]
  )

  const signOut = useCallback(() => {
    setSessionDateStorage(null)
    setUser(null)
    removeCookie('access_token', {
      path: '/',
    })
  }, [removeCookie, setSessionDateStorage, setUser])

  const signUp: AuthContextTypes['signUp'] = useCallback(
    (payload, options) => {
      signUpQuery.mutate(payload, options)
    },
    [signUpQuery]
  )

  const auth = useMemo(
    () => ({
      user,
      cookies: {
        accessToken: cookies.access_token,
      },
      // userInfoQuery,
      isUserAuthenticated,
      isUserRole,
      signIn,
      isSigningIn,
      signUp,
      isSigningUp,
      signOut,
      userId,
      userRole,
    }),
    [
      user,
      cookies.access_token,
      isUserRole,
      // userInfoQuery,
      isUserAuthenticated,
      signIn,
      isSigningIn,
      signUp,
      isSigningUp,
      signOut,
      userId,
      userRole,
    ]
  )

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
