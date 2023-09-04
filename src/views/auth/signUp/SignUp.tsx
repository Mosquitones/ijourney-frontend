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
import { useNavigate } from 'react-router-dom'

import { Button, Input, Logo } from 'components'
import { useAuth } from 'contexts'
import { ROUTES } from 'router'

import * as S from './SignUp.styles'
import { SignUpFormPropTypes } from './SignUp.types'
import { SignUpFormSchema } from './utils/SignUpForm.schema'

export default function SignUpPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signIn, isLoggingIn, cookies } = useAuth()

  const formik = useFormik<SignUpFormPropTypes>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignUpFormSchema,
    onSubmit: ({ email, password }) => {
      signIn({ email, password })
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
        Criar conta
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Encontre a sua próxima oportunidade!
      </Typography>

      {/* <Divider sx={{ color: 'text.secondary' }}>
        <Typography variant='body2' color='text.secondary'>
          ou entre com e-mail
        </Typography>
      </Divider> */}
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
      <Button
        variant='contained'
        fullWidth
        type='submit'
        color='black'
        loading={isLoggingIn}
      >
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
          Ja possui uma conta?{' '}
          <Link href={`/${ROUTES.AUTH}/${ROUTES.LOGIN}`} color='inherit'>
            Entre agora
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
