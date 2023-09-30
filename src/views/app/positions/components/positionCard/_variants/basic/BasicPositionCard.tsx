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
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { ChipList, Position } from 'components'
import { useIsDevice } from 'hooks'
import { getChips } from 'utils'

import { PositionBody } from '../../components'
import * as S from '../../PositionCard.styles'

import { BasicPositionCardPropTypes } from './BasicPositionCard.types'

export const BasicPositionCard: React.FC<BasicPositionCardPropTypes> = ({
  position,
  ...rest
}) => {
  const isDevice = useIsDevice()

  return (
    <S.Button {...rest} fullWidth>
      <S.Paper>
        <S.Wrapper>
          <S.Header>
            <Position.Header
              title={position.title}
              positionId={position.id}
              chips={getChips({
                employmentType: position.employmentType,
                locationType: position.locationType,
                salary: position.salaryRange,
              })}
            />
            <S.HeaderInfoContent>
              <Box display='flex' gap={1} alignItems='center'>
                <SvgIcon component={Place} sx={{ fontSize: '1.8rem' }} />
                <Typography
                  fontWeight={({ typography }) => typography.fontWeightBold}
                  variant='body2'
                >
                  {position.city}, {position.state}
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
                  Postado{' '}
                  {formatDistanceToNow(new Date(position.creationDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </Typography>
              </Box>
            </S.HeaderInfoContent>
          </S.Header>
          <PositionBody description={position.shortDescription} />
        </S.Wrapper>
      </S.Paper>
    </S.Button>
  )
}
