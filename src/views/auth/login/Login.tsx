/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useLayoutEffect } from 'react'

import { Button, Input } from '@eduplaytion/numetry-ui-kit'
import { Link, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { useAuth } from 'contexts'
import { ROUTES } from 'router'

import { FormStackStyles, LoginHeaderStyles } from './Login.styles'
import { LoginFormPropTypes } from './Login.types'
import { LoginFormSchema } from './utils/LoginForm.schema'

export default function LoginPage() {
  const { t } = useTranslation()
  const { signIn, userInfoQuery, isLoggingIn, cookies } = useAuth()

  const formik = useFormik<LoginFormPropTypes>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ email: loginId, password }) => {
      signIn({ loginId, password })
    },
  })

  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     userInfoQuery.mutate()
  //   }
  // }, [cookies.accessToken, userInfoQuery])

  useEffect(() => {
    userInfoQuery.mutate()
  }, [userInfoQuery])

  return (
    <form onSubmit={formik.handleSubmit}>
      <LoginHeaderStyles>
        <Typography color='primary.main' fontWeight='bold' variant='subtitle1'>
          {t('auth.login')}
        </Typography>
      </LoginHeaderStyles>
      <FormStackStyles spacing={2.5} p={3}>
        <Input
          type='text'
          name='email'
          placeholder={t('auth.emailPlaceholder')}
          label={t('auth.email')}
          value={formik.values.email}
          onChange={formik.handleChange}
          helperText={formik.errors.email}
          error={!!formik.errors.email}
        />
        <Input
          type='password'
          name='password'
          label={t('auth.password')}
          autoComplete='current-password'
          value={formik.values.password}
          onChange={formik.handleChange}
          helperText={formik.errors.password}
          error={!!formik.errors.password}
        />
        <Link href={`${ROUTES.LOGIN}/${ROUTES.FORGOT_PASSWORD}`}>
          {t('auth.forgotYourPassword')}
        </Link>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          value={t('auth.login')}
          disabled={isLoggingIn}
          loading={isLoggingIn}
        />
      </FormStackStyles>
    </form>
  )
}
