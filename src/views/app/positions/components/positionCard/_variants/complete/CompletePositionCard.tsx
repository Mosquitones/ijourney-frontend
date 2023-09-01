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
  Divider,
  IconButton,
  IconButtonProps,
  SvgIcon,
  SvgIconProps,
  Typography,
} from '@mui/material'

import { ChipList, Position } from 'components'
import { useIsDevice } from 'hooks'

import { PositionBody } from '../../components'
import * as S from '../../PositionCard.styles'

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
          gap={1}
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          {title}
          {titleAdditionalInfo && (
            <Typography
              component='span'
              variant='body2'
              fontWeight={({ typography }) => typography.fontWeightBold}
              color={({ palette }) => palette.success.dark}
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

export const CompletePositionCard: React.FC<{
  seeButtonProps: { href: string } & IconButtonProps
}> = ({ seeButtonProps }) => {
  const isDevice = useIsDevice()

  return (
    <S.Paper>
      <S.Wrapper>
        <S.Header>
          <Position.Header />
          <S.HeaderInfoContent>
            <Box display='flex' ml={-1}>
              {[
                { icon: VisibilityOutlined, id: 'see' },
                { icon: EditOutlined, id: 'edit' },
                { icon: DeleteOutlined, id: 'delete' },
                { icon: MoreVertOutlined, id: 'more' },
              ].map((item) => (
                <IconButton
                  key={item.id}
                  onClick={(e) => {
                    console.log('clicked ', item.id)
                  }}
                  {...(item.id === 'see' && seeButtonProps)}
                >
                  <Icon icon={item.icon} />
                </IconButton>
              ))}
            </Box>
          </S.HeaderInfoContent>
        </S.Header>
        <PositionBody
          description='Within this role, you will be creating content for a wide range of local
        and international clients. This role is suited to Bali based creatives
        looking to work in-house.'
        />
      </S.Wrapper>
      <Divider />

      <S.Footer>
        <Box display='flex' gap={4} py={2} px={3} flex={2}>
          <PositionInfo
            icon={CalendarMonthOutlined}
            title='Data'
            value={new Date().toLocaleDateString()}
          />
          <PositionInfo
            icon={PaidOutlined}
            title='Orçamento'
            value='R$1.2K - R$1.5K'
          />
        </Box>
        <Divider
          orientation={isDevice.from.md ? 'vertical' : 'horizontal'}
          flexItem
        />
        <Box display='flex' gap={3} py={2} px={3}>
          <PositionInfo
            title={String(70)}
            titleAdditionalInfo='(43 novos)'
            value='Aplicações'
          />
          <Divider orientation='vertical' flexItem />
          <PositionInfo title={String(5)} value='Selecionados' />
          <Divider orientation='vertical' flexItem />
          <PositionInfo title={String(0)} value='Contratados' />
        </Box>
      </S.Footer>
    </S.Paper>
  )
}
