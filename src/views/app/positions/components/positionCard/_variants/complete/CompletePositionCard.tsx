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
  CircularProgress,
  Divider,
  IconButton,
  IconButtonProps,
  SvgIcon,
  SvgIconProps,
  Tooltip,
  Typography,
} from '@mui/material'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMutation, useQueryClient } from 'react-query'
import { getChips } from 'utils/getChips'

import { ChipList, ChipListPropTypes, Position } from 'components'
import { useAuth, useFeedback } from 'contexts'
import { useIsDevice } from 'hooks'
import { ApiResponseTypes, PositionServices } from 'services'
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
  const { userId } = useAuth()
  const queryClient = useQueryClient()
  const { alert } = useFeedback()
  const isDevice = useIsDevice()

  const deletePositionQuery = useMutation({
    mutationKey: [`/positions/${position.id}`, { method: 'DELETE' }],
    mutationFn: () => PositionServices.id.delete(position.id),
    onSuccess: () => {
      queryClient.fetchQuery([`/positions`, { method: 'GET' }])
      queryClient.fetchQuery([
        `/recruiters/${userId}/positions`,
        { method: 'GET' },
      ])
      alert.showSuccess('Vaga deletada com sucesso')
      // queryClient.refetchQueries([
      //   ['/positions', { method: 'GET' }],
      //   [`/recruiters/${userId}/positions`, { method: 'GET' }],
      // ])
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  return (
    <S.Paper>
      <S.Wrapper>
        <S.Header>
          <Position.Header
            title={position.title}
            chips={getChips({
              employmentType: position.employmentType,
              locationType: position.locationType,
              salary: position.salaryRange,
            })}
          />
          <S.HeaderInfoContent>
            <Box display='flex' ml={-1}>
              {(
                [
                  {
                    icon: VisibilityOutlined,
                    id: 'see',
                    color: 'info',
                    tooltip: 'Clique para visualizar a vaga',
                  },
                  {
                    icon: EditOutlined,
                    id: 'edit',
                    onClick: onEditClick,
                    tooltip: 'Clique para editar vaga',
                  },
                  {
                    icon: DeleteOutlined,
                    id: 'delete',
                    disabled: deletePositionQuery.isLoading,
                    isLoading: deletePositionQuery.isLoading,
                    color: 'error',
                    tooltip: 'Clique para deletar a vaga',
                    onClick: () => deletePositionQuery.mutate(),
                  },
                  { icon: MoreVertOutlined, id: 'more' },
                ] as (IconButtonProps & {
                  tooltip?: string
                  icon: React.ElementType
                  isLoading?: boolean
                })[]
              ).map(({ tooltip, ...buttonRest }) => {
                const button = (
                  <IconButton
                    key={buttonRest.id}
                    {...buttonRest}
                    {...(buttonRest.id === 'see' && seeButtonProps)}
                  >
                    {buttonRest.isLoading ? (
                      <Box
                        display='flex'
                        alignItems='center'
                        bgcolor='white'
                        p={1}
                        borderRadius={30}
                        border={({ palette }) =>
                          `0.1rem solid ${palette.divider}`
                        }
                      >
                        <CircularProgress
                          size={20}
                          sx={({ palette }) => ({ color: palette.grey[600] })}
                        />
                      </Box>
                    ) : (
                      <Icon icon={buttonRest.icon} color='inherit' />
                    )}
                  </IconButton>
                )

                if (tooltip) {
                  return (
                    <Tooltip title={tooltip} key={buttonRest.id}>
                      {button}
                    </Tooltip>
                  )
                }

                return button
              })}
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
