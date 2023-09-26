/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  AttachMoneyOutlined,
  BusinessCenter,
  CalendarMonthOutlined,
  Circle,
  DeleteOutlined,
  EditOutlined,
  MoreVertOutlined,
  PaidOutlined,
  Place,
  QueryBuilder,
  VisibilityOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  ButtonBaseProps,
  ButtonProps,
  Chip,
  ChipProps,
  Divider,
  IconButton,
  IconButtonProps,
  SvgIcon,
  SvgIconProps,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getChips } from 'utils/getChips'

import { ChipList, ChipListPropTypes, Position } from 'components'
import { useIsDevice } from 'hooks'
import { currencyFormatter } from 'utils'

import { PositionBody } from '../../components'
import * as S from '../../PositionCard.styles'

import { CompletePositionCardPropTypes } from './CompletePositionCard.types'

const Icon: React.FC<{ icon: React.ElementType } & SvgIconProps> = ({
  icon,
  ...rest
}) => {
  return (
    <SvgIcon
      {...rest}
      component={icon}
      sx={{
        borderRadius: 100,
        p: 1,
        fontSize: 40,
        backgroundColor: ({ palette }) => palette.common.white,
        color: ({ palette }) => palette.text.secondary,
        border: ({ palette }) => `0.1rem solid ${palette.divider}`,
        ...rest.sx,
      }}
    />
  )
}

const PositionInfo: React.FC<{
  title: string
  titleAdditionalInfo?: string
  icon?: React.ElementType
  value: string
}> = ({ icon, title, value, titleAdditionalInfo, ...rest }) => {
  return (
    <Box display='flex' alignItems='center' gap={2}>
      {icon && <Icon icon={icon} />}
      <Box display='flex' flexDirection='column'>
        <Typography
          variant='body1'
          color='text.primary'
          display='flex'
          alignItems='center'
          gap={0.5}
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          {title}
          {titleAdditionalInfo && (
            <Typography
              component='span'
              variant='body2'
              fontWeight={({ typography }) => typography.fontWeightBold}
              color={({ palette }) => palette.primary.main}
            >
              {titleAdditionalInfo}
            </Typography>
          )}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export const CompletePositionCard: React.FC<CompletePositionCardPropTypes> = ({
  seeButtonProps,
  position,
  onEditClick,
}) => {
  const isDevice = useIsDevice()

  return (
    <S.Paper>
      <S.Wrapper>
        <S.Header>
          <Position.Header
            title={position.title}
            chips={getChips({
              employmentType: position.employmentType,
              locationType: position.locationType,
            })}
          />
          <S.HeaderInfoContent>
            <Box display='flex' ml={-1}>
              {[
                { icon: VisibilityOutlined, id: 'see' },
                { icon: EditOutlined, id: 'edit', onClick: onEditClick },
                { icon: DeleteOutlined, id: 'delete' },
                { icon: MoreVertOutlined, id: 'more' },
              ].map((item) => (
                <IconButton
                  key={item.id}
                  onClick={item.onClick}
                  {...(item.id === 'see' && seeButtonProps)}
                >
                  <Icon icon={item.icon} />
                </IconButton>
              ))}
            </Box>
          </S.HeaderInfoContent>
        </S.Header>
        <PositionBody description={position.shortDescription} />
      </S.Wrapper>
      <Divider />

      <S.Footer>
        <Box display='flex' gap={4} py={2} px={3} flex={1}>
          <PositionInfo
            icon={CalendarMonthOutlined}
            title='Data'
            value={format(new Date(position.creationDate), 'dd/MM/yyyy')}
          />
          <PositionInfo
            icon={PaidOutlined}
            title='Orçamento'
            value={currencyFormatter.format(position.salaryRange)}
          />
        </Box>
        <Divider
          orientation={isDevice.from.md ? 'vertical' : 'horizontal'}
          flexItem
        />
        <Box display='flex' gap={3} py={2} px={3} flex={1}>
          <PositionInfo
            title={String(position.numOfAppliedPeople)}
            value='Aplicações'
          />
          <Divider orientation='vertical' flexItem />
          <PositionInfo
            title={String(position.numOfSelectedPeople)}
            value='Selecionados'
          />
          <Divider orientation='vertical' flexItem />
          <PositionInfo
            title={String(position.numOfHiredPeople)}
            value='Contratados'
            titleAdditionalInfo={`/${position.numOfMaxHiredPeople}`}
          />
        </Box>
      </S.Footer>
    </S.Paper>
  )
}
