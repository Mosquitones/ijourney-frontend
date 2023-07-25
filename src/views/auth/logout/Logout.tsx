import React, { useEffect } from 'react'

import { COLORS, FONT_WEIGHTS } from '@eduplaytion/numetry-ui-kit'
import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useAuth } from 'contexts'

import { LogoutLayoutStyles } from './Logout.styles'

export default function LogoutPage() {
  const { t } = useTranslation()
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
  }, [signOut])

  return (
    <LogoutLayoutStyles>
      <Box>
        <LinearProgress color='primary' />
      </Box>
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <Typography color={COLORS.dark} fontWeight={FONT_WEIGHTS.extraBold}>
          {t('!#Logging out...')}
        </Typography>
      </Stack>
    </LogoutLayoutStyles>
  )
}
