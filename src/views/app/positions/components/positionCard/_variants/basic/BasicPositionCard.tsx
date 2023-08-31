/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  AttachMoneyOutlined,
  BusinessCenter,
  CalendarMonthOutlined,
  Circle,
  PaidOutlined,
  Place,
  QueryBuilder,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  ButtonProps,
  Chip,
  Divider,
  SvgIcon,
  Typography,
} from '@mui/material'

import { ChipList, Position } from 'components'
import { useIsDevice } from 'hooks'

import { PositionBody } from '../../components'
import * as S from '../../PositionCard.styles'

export const BasicPositionCard: React.FC<ButtonProps> = (props) => {
  const isDevice = useIsDevice()

  return (
    <S.Button {...props} fullWidth>
      <S.Paper>
        <S.Wrapper>
          <S.Header>
            <Position.Header />
            <S.HeaderInfoContent>
              <Box display='flex' gap={1} alignItems='center'>
                <SvgIcon component={Place} sx={{ fontSize: '1.8rem' }} />
                <Typography
                  fontWeight={({ typography }) => typography.fontWeightBold}
                  variant='body2'
                >
                  Vila Mariana, São Paulo
                </Typography>
              </Box>
              <Box display='flex' gap={1} alignItems='center'>
                {isDevice.to.md && (
                  <SvgIcon
                    component={QueryBuilder}
                    sx={{ fontSize: '1.8rem', color: 'text.secondary' }}
                  />
                )}
                <Typography color='text.secondary' variant='body2'>
                  Postado há 5 min atrás
                </Typography>
              </Box>
            </S.HeaderInfoContent>
          </S.Header>
          <PositionBody
            description='Within this role, you will be creating content for a wide range of local
        and international clients. This role is suited to Bali based creatives
        looking to work in-house.'
          />
        </S.Wrapper>
      </S.Paper>
    </S.Button>
  )
}
