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
import { useMutation, useQuery } from 'react-query'

import { Button, Position } from 'components'
import { useAuth, useFeedback } from 'contexts'
import { ROUTES } from 'router'
import {
  ApiResponseTypes,
  CandidateServices,
  RecruiterServices,
} from 'services'
import { getChips } from 'utils'

import * as S from '../positionAccordion/PositionAccordion.styles'

import { PositionAccordionPropTypes } from './PositionAccordionSaved.types'

export const PositionAccordionSaved: React.FC<PositionAccordionPropTypes> = ({
  position,
}) => {
  const { alert } = useFeedback()
  const { userId } = useAuth()
  const recruiterIdQuery = useQuery({
    queryKey: [`/recruiters/${position.recruiterId}`, { method: 'GET' }],
    queryFn: () => RecruiterServices.id.get(position.recruiterId),
  })

  const deleteSavedPositionIdQuery = useMutation({
    mutationKey: [`/candidates/positions/${position.id}`, { method: 'DELETE' }],
    mutationFn: CandidateServices.positions.saved.delete,
    onSuccess: () => {
      alert.showSuccess('Você removeu essa vaga dos salvos')
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

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
        </Box>
      </S.AccordionSummary>
      <S.AccordionDetails>
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
            variant='contained'
            color='black'
            href={`/${ROUTES.APP}/${ROUTES.POSITIONS}/${position.id}`}
          >
            Visualizar vaga
          </Button>
          <Button
            variant='text'
            color='black'
            disabled={
              deleteSavedPositionIdQuery.isLoading ||
              deleteSavedPositionIdQuery.isSuccess
            }
            loading={deleteSavedPositionIdQuery.isLoading}
            onClick={() => {
              deleteSavedPositionIdQuery.mutate({
                candidateId: userId,
                positionId: position.id,
              })
            }}
          >
            {deleteSavedPositionIdQuery.isIdle && 'Remover salvo'}
            {deleteSavedPositionIdQuery.isLoading && 'Removendo...'}
            {deleteSavedPositionIdQuery.isSuccess && 'Removido'}
          </Button>
        </Box>
      </S.AccordionDetails>
    </S.Accordion>
  )
}
