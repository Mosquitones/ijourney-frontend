/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'

import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'contexts'
import { ROUTES } from 'router'
import { timeToMilliseconds } from 'utils'

import { LogoutLayoutStyles } from './Logout.styles'

const TWO_SECONDS = timeToMilliseconds({ seconds: 2 })

export default function LogoutPage() {
  const { t } = useTranslation()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    signOut()

    const interval = setInterval(() => {
      navigate(ROUTES.BASE_ROOT)
    }, TWO_SECONDS)

    return () => clearInterval(interval)
  }, [navigate, signOut])

  return (
    <LogoutLayoutStyles>
      <Box>
        <LinearProgress color='primary' />
      </Box>
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <Typography
          mt={4}
          variant='h3'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          {t('Desconectando...')}
        </Typography>
      </Stack>
    </LogoutLayoutStyles>
  )
}
