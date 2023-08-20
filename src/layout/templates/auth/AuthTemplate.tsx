import React from 'react'

import { Box, Divider, Typography } from '@mui/material'
import bottomLeftImg from 'assets/images/auth/bottom-left-auth-img.png'
import topImg from 'assets/images/auth/top-auth-img.png'
import { Outlet } from 'react-router-dom'

import { useIsDevice } from 'hooks'

import * as S from './AuthTemplate.styles'

export const AuthTemplate: React.FC = () => {
  const device = useIsDevice()
  const title = 'Encontre a oportunidade perfeita para você!'

  const description =
    'Procure pelas centenas de vagas disponíveis na melhor empresa do mundo.'

  return (
    <S.AuthTemplate>
      <S.Content
        bgcolor={({ palette }) => palette.background.paper}
        flex={{ sm: 1 }}
        // height={{ xs: '20vh' }}
        // maxHeight={{ xs: '20%', sm: '100%' }}
      >
        <img src={topImg} alt='top' id='top-img' />
        <Box>
          <img src={bottomLeftImg} alt='top' id='bottom-left-img' />
          <S.TextBox>
            <Typography
              variant='h2'
              textAlign={{ xs: 'center', sm: 'right' }}
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              {title}
            </Typography>
            <Typography
              textAlign={{ xs: 'center', sm: 'right' }}
              variant='h3'
              color='text.secondary'
            >
              {description}
            </Typography>
          </S.TextBox>
        </Box>
      </S.Content>

      <Divider
        orientation={device.from.sm ? 'vertical' : 'horizontal'}
        flexItem
      />

      <S.Content flex={{ sm: 1 }}>
        <Outlet />
      </S.Content>
    </S.AuthTemplate>
  )
}
