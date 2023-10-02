/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
  BusinessCenter,
  ExpandMore,
  KeyboardBackspaceOutlined,
  PlaceOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Divider,
  Link,
  Alert,
} from '@mui/material'
import { AxiosError } from 'axios'
import { CircularProgress } from 'components/circularProgress/CircularProgress'
import ConfettiExplosion from 'react-confetti-explosion'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { TabTypes } from 'views/app/positions/subViews'

import { Button, PhaseStatusIndicator, Position } from 'components'
import { useAuth, useFeedback, useTabContext } from 'contexts'
import { ROUTES } from 'router'
import {
  ApiResponseTypes,
  CandidateServices,
  PositionTypes,
  RecruiterServices,
} from 'services'
import { getChips } from 'utils'

import * as S from '../positionAccordion/PositionAccordion.styles'

import { PositionArchivedAccordionPropTypes } from './PositionArchivedAccordion.types'

export const PositionArchivedAccordion: React.FC<
  PositionArchivedAccordionPropTypes
> = ({ position }) => {
  const { alert } = useFeedback()
  const { userId } = useAuth()
  const queryClient = useQueryClient()

  const recruiterIdQuery = useQuery({
    queryKey: [`/recruiters/${position.recruiterId}`, { method: 'GET' }],
    queryFn: () => RecruiterServices.id.get(position.recruiterId),
  })

  const isHired = position.positionStatusPercentage === 100

  return (
    <S.Accordion
      disableGutters
      TransitionProps={{ unmountOnExit: true }}
      isConcluded={isHired}
    >
      <S.AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          flex={1}
          pr={2}
        >
          <Position.Header
            positionId={position.id}
            title={position.title}
            chips={getChips({
              employmentType: position.employmentType,
              locationType: position.locationType,
              salary: position.salaryRange,
            })}
          />
          {isHired ? (
            <PhaseStatusIndicator phaseStatusType='HIRED' />
          ) : (
            <CircularProgress
              value={position.positionStatusPercentage || 0}
              color={isHired ? 'success' : 'primary'}
            />
          )}
        </Box>
      </S.AccordionSummary>
      <S.AccordionDetails>
        {isHired && (
          <>
            <S.ItemContainer
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              <Alert severity='success' sx={{ width: '100%' }}>
                Meus parabéns! Você foi contratado por{' '}
                <b>{recruiterIdQuery.data?.fullName}</b> para trabalhar como{' '}
                <b>{position.title}</b> na <b>{position.companyName}</b>{' '}
                🎉🎉🎉🎉
              </Alert>
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={150}
                width={1200}
              />
            </S.ItemContainer>
            <Divider />
          </>
        )}
        <S.ItemContainer>
          <Position.Requirement
            title='Requisitos'
            topicListProps={{ requirements: position.requirements }}
          />
        </S.ItemContainer>

        <Divider />

        <S.ItemContainer>
          <Position.Details
            recruiter={recruiterIdQuery.data}
            createdAt={new Date(position.creationDate)}
          />
        </S.ItemContainer>

        <Divider />

        <Box display='flex' alignItems='center' gap={2} py={2} px={3}>
          <Button
            variant={isHired ? 'outlined' : 'contained'}
            color='black'
            href={`/${ROUTES.APP}/${ROUTES.POSITIONS}/${position.id}?tab=${
              'description' as TabTypes['id']
            }`}
          >
            Visualizar vaga
          </Button>
          {isHired && (
            <Button
              variant='contained'
              color='black'
              href={`tel:${recruiterIdQuery.data?.phoneNumber}`}
            >
              Entrar em contato com o recrutador
            </Button>
          )}
        </Box>
      </S.AccordionDetails>
    </S.Accordion>
  )
}
