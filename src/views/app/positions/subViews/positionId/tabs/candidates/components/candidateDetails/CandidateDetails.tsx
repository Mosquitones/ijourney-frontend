/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react'

import {
  Close,
  Email,
  LocalPhoneRounded,
  TrendingFlatRounded,
} from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Drawer,
  Divider,
  Box,
  Avatar,
  SvgIcon,
  ButtonBase,
  Button,
  ButtonProps,
} from '@mui/material'
import { AdditionalFilters } from 'views/app/positions/components'

import { DialogTitleComponent, TopicList } from 'components'
import { useDisclosure, useIsDevice } from 'hooks'

import * as S from './CandidateDetails.styles'
import { CandidateDetailPropTypes } from './CandidateDetails.types'

const PADDING_PROPS = {
  py: 2,
  px: 3,
} as const

const ButtonComponent: React.FC<
  {
    title: string
    icon: React.ElementType
    value: string
  } & ButtonProps
> = ({ icon, title, value, ...rest }) => {
  return (
    <Button
      {...rest}
      tabIndex={0}
      sx={{
        justifyContent: 'flex-start',
        borderRadius: 0,
        textAlign: 'left',
        py: PADDING_PROPS.py,
      }}
    >
      <Box display='flex' alignItems='center' gap={2}>
        <SvgIcon
          component={icon}
          sx={{
            borderRadius: 100,
            p: 1,
            fontSize: 40,
            backgroundColor: ({ palette }) => palette.grey[50],
            color: ({ palette }) => palette.text.secondary,
          }}
        />
        <Box display='flex' flexDirection='column'>
          <Typography
            variant='body1'
            color='text.primary'
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Button>
  )
}

const DetailTextComponent: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Typography variant='body1' color='text.secondary' display='flex' gap={1}>
      <Typography fontWeight={({ typography }) => typography.fontWeightBold}>
        {title}
      </Typography>
      {value}
    </Typography>
  )
}
export const CandidateDetailsDialog: React.FC<CandidateDetailPropTypes> = ({
  isOpen,
  onClose,
}) => {
  return (
    <S.Drawer anchor='right' open={isOpen} onClose={onClose}>
      <DialogTitleComponent
        title='Informações do candidato'
        onClose={onClose}
      />
      <Divider />
      <Box
        {...PADDING_PROPS}
        display='flex'
        alignItems='center'
        gap={3}
        flexWrap='wrap'
      >
        <Avatar sx={{ width: 55, height: 55 }} />
        <Box display='flex' flexDirection='column'>
          <Typography
            variant='subtitle1'
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Isaque Anderson
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Frontend developer
          </Typography>
        </Box>
      </Box>
      <Divider />

      <Box bgcolor='background.paper' display='flex' alignItems='center'>
        <ButtonComponent
          fullWidth
          icon={Email}
          href='mailto:isaque@eu.com'
          title='E-mail'
          value='isaque@eu.com'
        />
        <Divider orientation='vertical' flexItem />
        <ButtonComponent
          fullWidth
          icon={LocalPhoneRounded}
          title='Telefone'
          href='tel:(11) 92345-2345'
          value='(11) 92345-2345'
        />
      </Box>
      <Divider />
      <Box
        px={PADDING_PROPS.px}
        py={4}
        display='flex'
        flexDirection='column'
        gap={5}
      >
        <Box display='flex' flexDirection='column' gap={2}>
          <Typography
            variant='body1'
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Detalhes da aplicação
          </Typography>
          <TopicList />
        </Box>
        <Box display='flex' flexDirection='column' gap={2}>
          <Typography
            variant='body1'
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Pontuações
          </Typography>
          <TopicList />
        </Box>
        <Box display='flex' flexDirection='column' gap={2}>
          <Typography
            variant='body1'
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Detalhes
          </Typography>
          <Box display='flex' flexDirection='column' gap={0.5}>
            <DetailTextComponent title='Aplicado em:' value='15 Jun' />
            <DetailTextComponent title='Vence em:' value='30 Jul' />
            <DetailTextComponent title='Criado por:' value='Anderson Ramires' />
          </Box>
        </Box>
      </Box>
      <Box position='sticky' bottom={0} bgcolor='white'>
        <Divider />
        <DialogActions sx={{ ...PADDING_PROPS }}>
          <Button
            fullWidth
            onClick={() => null}
            variant='contained'
            sx={{
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            Mover para próximo passo
            <SvgIcon component={TrendingFlatRounded} fontSize='large' />
          </Button>
        </DialogActions>
      </Box>
    </S.Drawer>
  )
}
