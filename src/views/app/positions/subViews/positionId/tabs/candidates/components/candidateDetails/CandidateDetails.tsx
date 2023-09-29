/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react'

import {
  CheckCircleRounded,
  Close,
  Email,
  ErrorOutlineRounded,
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
  CircularProgress,
  Chip,
} from '@mui/material'
import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { AdditionalFilters } from 'views/app/positions/components'

import { DialogTitleComponent, Position, TopicList } from 'components'
import { useFeedback } from 'contexts'
import { useDisclosure, useIsDevice } from 'hooks'
import { ApiResponseTypes, CandidateServices } from 'services'
import { getPositionScores } from 'utils'

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
        overflow: 'hidden',
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
            // noWrap
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            {title}
          </Typography>
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '14.5rem',
            }}
          >
            <Typography
              variant='body2'
              color='text.secondary'
              noWrap
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Button>
  )
}

export const CandidateDetailsDialog: React.FC<CandidateDetailPropTypes> = ({
  isOpen,
  onClose,
  candidatePositionId,
}) => {
  const { positionId } = useParams()
  const { alert } = useFeedback()

  const isDevice = useIsDevice()
  const candidatePositionStatusQuery = useQuery({
    queryKey: [
      `/candidates/positions/${candidatePositionId}/status`,
      { method: 'GET' },
    ],
    queryFn: () =>
      CandidateServices.positions.id.status.get(Number(candidatePositionId)),
    enabled: !!candidatePositionId,
  })

  const updateCandidatePhase = useMutation({
    mutationKey: [`/candidates/positions/phases`, { method: 'PUT' }],
    mutationFn: CandidateServices.positions.phases.put,
    onSuccess: () => {
      alert.showSuccess('Candidato avançou no processo')
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const candidate = candidatePositionStatusQuery.data

  return (
    <S.Drawer anchor='right' open={isOpen} onClose={onClose}>
      <DialogTitleComponent
        title='Informações do candidato'
        onClose={onClose}
      />
      <Divider />
      {candidatePositionStatusQuery.isLoading ? (
        <Box
          flex={1}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress size={50} />
        </Box>
      ) : candidate ? (
        <>
          <Box
            {...PADDING_PROPS}
            display='flex'
            alignItems='center'
            gap={3}
            flexWrap='wrap'
          >
            <Avatar sx={{ width: 55, height: 55 }} src={candidate.picture} />
            <Box display='flex' flexDirection='column' gap={1}>
              <Typography
                variant='subtitle1'
                fontWeight={({ typography }) => typography.fontWeightBold}
              >
                {candidate.name}
              </Typography>
              <Box display='flex' flexWrap='wrap' gap={1} alignItems='center'>
                {candidate.skills
                  .sort((a, b) => a.id - b.id)
                  .map((skill) => (
                    <Chip
                      key={skill.id}
                      variant='outlined'
                      label={skill.name}
                    />
                  ))}
              </Box>
              <Typography
                color='secondary'
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => {
                  if (!candidate.resume) return
                  const pdfWindow = window.open('')
                  if (!pdfWindow) return
                  pdfWindow.document.write(
                    `<iframe 
                    width='100%' 
                    height='100%' 
                    title='${candidate.name}' 
                    src='${encodeURI(candidate.resume)}'
                    ></iframe>`
                  )
                }}
              >
                Ver currículo
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Box
            bgcolor='background.paper'
            display='flex'
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems='center'
          >
            <ButtonComponent
              fullWidth
              icon={Email}
              href={`mailto:${candidate.email}`}
              title='E-mail'
              value={candidate.email}
            />
            <Divider
              orientation={isDevice.from.sm ? 'vertical' : 'horizontal'}
              flexItem
            />
            <ButtonComponent
              fullWidth
              icon={LocalPhoneRounded}
              title='Telefone'
              href={`tel:${candidate.phoneNumber}`}
              value={candidate.phoneNumber}
            />
          </Box>
          <Divider />
          <Box
            px={PADDING_PROPS.px}
            py={4}
            display='flex'
            flexDirection='column'
            gap={4}
            flex={1}
          >
            <Position.Status
              phases={candidate.phases}
              currentPhaseIndex={candidate.currentPhaseIndex}
            />
            <Divider />
            <Position.Score
              {...getPositionScores({ requirements: candidate.requirements })}
            />
            <Divider />
            <Position.Details appliedAt={new Date(candidate.appliedAt)} />
          </Box>
          <Box position='sticky' bottom={0} bgcolor='white' top='auto'>
            <Divider />
            <DialogActions sx={{ ...PADDING_PROPS }}>
              <Button
                variant='contained'
                fullWidth
                onClick={() => {
                  if (candidatePositionId) {
                    updateCandidatePhase.mutate({
                      candidatePositionId,
                      newPhaseIndex: candidate.currentPhaseIndex + 1,
                    })
                  }
                }}
                sx={{
                  color: 'primary.contrastText',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {updateCandidatePhase.isIdle && (
                  <>
                    Mover para próximo passo
                    <SvgIcon component={TrendingFlatRounded} fontSize='large' />
                  </>
                )}
                {updateCandidatePhase.isLoading && (
                  <CircularProgress size={24} />
                )}
                {updateCandidatePhase.isError && (
                  <>
                    Aconteceu um erro
                    <SvgIcon component={ErrorOutlineRounded} fontSize='large' />
                  </>
                )}
                {updateCandidatePhase.isSuccess && (
                  <>
                    Movido com sucesso
                    <SvgIcon component={CheckCircleRounded} fontSize='large' />
                  </>
                )}
              </Button>
            </DialogActions>
          </Box>
        </>
      ) : (
        <Box
          flex={1}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <CircularProgress />
        </Box>
      )}
    </S.Drawer>
  )
}
