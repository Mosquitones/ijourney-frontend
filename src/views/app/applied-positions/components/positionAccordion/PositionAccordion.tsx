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
} from '@mui/material'
import { AxiosError } from 'axios'
import { CircularProgress } from 'components/circularProgress/CircularProgress'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { TabTypes } from 'views/app/positions/subViews'

import { Button, Position } from 'components'
import { useAuth, useFeedback } from 'contexts'
import { ROUTES } from 'router'
import {
  ApiResponseTypes,
  CandidateServices,
  RecruiterServices,
} from 'services'
import { getChips, getPositionScores } from 'utils'

import * as S from './PositionAccordion.styles'
import { PositionAccordionPropTypes } from './PositionAccordion.types'

export const PositionAccordion: React.FC<PositionAccordionPropTypes> = ({
  position,
}) => {
  const { alert } = useFeedback()
  const { userId } = useAuth()
  const queryClient = useQueryClient()

  const recruiterIdQuery = useQuery({
    queryKey: [`/recruiters/${position.recruiterId}`, { method: 'GET' }],
    queryFn: () => RecruiterServices.id.get(position.recruiterId),
  })

  const leaveFromPositionIdQuery = useMutation({
    mutationKey: [
      `/candidates/positions/${position.candidatePositionId}`,
      { method: 'DELETE' },
    ],
    mutationFn: CandidateServices.positions.delete,
    onSuccess: () => {
      queryClient.fetchQuery([
        `/candidates/${userId}/positions`,
        { method: 'GET' },
      ])
      alert.showSuccess('Você saiu da vaga')
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  // const progress =  position.phases.reduce((acc, cur) => acc + (cur. + 1 )) / position.phases.length
  // const progress = position.phases.reduce((acc, b) => acc + b.sequenceIndex, 0)

  return (
    <S.Accordion disableGutters TransitionProps={{ unmountOnExit: true }}>
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
          <CircularProgress value={position.positionStatusPercentage || 0} />
        </Box>
      </S.AccordionSummary>
      <S.AccordionDetails>
        <S.ItemContainer>
          <Position.Status
            phases={position.phases}
            currentPhaseIndex={position.currentPhaseIndex}
          />
        </S.ItemContainer>
        <Divider />
        <S.ItemContainer>
          <Position.Requirement
            topicListProps={{ requirements: position.requirements }}
          />
        </S.ItemContainer>
        <Divider />
        <S.ItemContainer>
          <Position.Score
            {...getPositionScores({ requirements: position.requirements })}
            header={{
              title: 'Pontuações',
              endAdornment: (
                <Link
                  underline='hover'
                  sx={{
                    color: ({ palette }) => palette.primary.main,
                    textDecorationColor: ({ palette }) => palette.info.main,
                    fontWeight: ({ typography }) => typography.fontWeightBold,
                  }}
                  href={`/${ROUTES.APP}/${ROUTES.POSITIONS}/${
                    position.id
                  }?tab=${'description' as TabTypes['id']}`}
                >
                  Consultar detalhes da vaga
                </Link>
              ),
            }}
          />
        </S.ItemContainer>

        <Divider />

        <S.ItemContainer>
          <Position.Details
            recruiter={recruiterIdQuery.data}
            createdAt={new Date(position.creationDate)}
            savedAt={position?.savedAt ? new Date(position.savedAt) : undefined}
          />
        </S.ItemContainer>

        <Divider />

        <Box
          display='flex'
          alignItems='center'
          gap={2}
          py={2}
          px={3}
          flexWrap='wrap'
        >
          <Button variant='contained' color='black'>
            Enviar Sugestão
          </Button>
          <Button variant='outlined' color='black'>
            Enviar reclamação
          </Button>
          <Button
            variant='text'
            color='black'
            disabled={
              leaveFromPositionIdQuery.isLoading ||
              leaveFromPositionIdQuery.isSuccess
            }
            loading={leaveFromPositionIdQuery.isLoading}
            onClick={() => {
              leaveFromPositionIdQuery.mutate(position.candidatePositionId)
            }}
          >
            {leaveFromPositionIdQuery.isIdle && 'Deixar aplicação'}
            {leaveFromPositionIdQuery.isLoading && 'Deixando...'}
            {leaveFromPositionIdQuery.isSuccess && 'Deixou aplicação'}
          </Button>
        </Box>
      </S.AccordionDetails>
    </S.Accordion>
  )
}
