import React from 'react'

import { Button, Input } from '@eduplaytion/numetry-ui-kit'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { FormStackStyles, LoginHeaderStyles } from '../login/Login.styles'

export default function ForgotPasswordPage() {
  const { t } = useTranslation()

  return (
    <>
      <LoginHeaderStyles>
        <Typography color='primary.main' fontWeight='bold' variant='subtitle1'>
          {t('auth.forgotYourPassword')}
        </Typography>
      </LoginHeaderStyles>
      <FormStackStyles spacing={2.5} padding={2.5}>
        <Input
          name='email'
          type='email'
          label={t('auth.enterYourEmail')}
          placeholder={t('auth.emailPlaceholder')}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          value={t('auth.sendPasswordResetLink')}
          fontSize='normal'
        />
      </FormStackStyles>
    </>
  )
}
