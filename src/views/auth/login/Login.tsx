/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useLayoutEffect } from 'react'

import { Google } from '@mui/icons-material'
import {
  Box,
  Divider,
  Link,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material'
import { Formik, useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { Button, Input, Logo } from 'components'
import { useAuth } from 'contexts'
import { ROUTES } from 'router'

import * as S from './Login.styles'
import { LoginFormPropTypes } from './Login.types'
import { LoginFormSchema } from './utils/LoginForm.schema'

export default function LoginPage() {
  const { t } = useTranslation()
  const { signIn, isLoggingIn, cookies } = useAuth()

  const formik = useFormik<LoginFormPropTypes>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormSchema,
    onSubmit: ({ email: loginId, password }) => {
      signIn({ loginId, password })
    },
  })

  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     userInfoQuery.mutate()
  //   }
  // }, [cookies.accessToken, userInfoQuery])

  // useEffect(() => {
  //   userInfoQuery.mutate()
  // }, [userInfoQuery])

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <Logo extended containerProps={{ mb: 2 }} />
      <Typography
        fontWeight={({ typography }) => typography.fontWeightBold}
        variant='h1'
      >
        Entrar
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Encontre a sua próxima oportunidade!
      </Typography>
      <Button variant='outlined' color='info' type='button'>
        <SvgIcon component={Google} fontSize='small' sx={{ mr: 1.5 }} />
        Entrar com Google
      </Button>

      <Divider sx={{ color: 'text.secondary' }}>
        <Typography variant='body2' color='text.secondary'>
          ou entre com e-mail
        </Typography>
      </Divider>
      <Input
        {...formik.getFieldProps('email')}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email ? formik.errors.email : undefined}
        label='E-mail'
        autoComplete='email'
        placeholder='email@examplo.com'
        fullWidth
      />
      <Input
        {...formik.getFieldProps('password')}
        error={formik.touched.password && !!formik.errors.password}
        helperText={
          formik.touched.password ? formik.errors.password : undefined
        }
        label='Senha'
        placeholder='********'
        fullWidth
        autoComplete='current-password'
        type='password'
      />
      <Box display='flex' alignItems='flex-end' justifyContent='flex-end'>
        <Link href='#' color='text.secondary'>
          Esqueceu a senha?
        </Link>
      </Box>
      <Button variant='contained' fullWidth type='submit'>
        Entrar
      </Button>
      <Box
        maxWidth={500}
        display='flex'
        flexDirection='column'
        gap={4}
        margin='0 auto'
        textAlign='center'
      >
        <Typography
          color='text.primary'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          Não possui conta?{' '}
          <Link href='#' color='inherit'>
            Cadastre-se agora
          </Link>
        </Typography>
      </Box>
      {/* <Box
        maxWidth={500}
        display='flex'
        flexDirection='column'
        gap={4}
        margin='0 auto'
        textAlign='center'
      >
        <Typography color='text.secondary'>
          Continuando você aceita nossos{' '}
          <Link href='#' color='inherit' minWidth='max-content'>
            termos e condições
          </Link>{' '}
          e nossa{' '}
          <Link href='#' color='inherit' minWidth='max-content'>
            política de privacidade
          </Link>
        </Typography>
        <Typography
          color='text.primary'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          Não possui conta?{' '}
          <Link href='#' color='inherit'>
            Cadastre-se agora
          </Link>
        </Typography>
      </Box> */}
    </S.Form>
  )
}
