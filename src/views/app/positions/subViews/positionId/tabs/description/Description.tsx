/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
  BusinessCenter,
  KeyboardBackspaceOutlined,
  PlaceOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import {
  Avatar,
  Box,
  BoxProps,
  ButtonBase,
  Chip,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Select,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'

import { Banner, Button, ChipList, Input, MarkdownViewer } from 'components'
import { useAuth, useFeedback, useTabContext } from 'contexts'
import { useIsDevice } from 'hooks'
import { ApiResponseTypes, CandidateServices, PositionTypes } from 'services'
import { getChips } from 'utils'

import { MARKDOWN_TEXT } from './markdown.util'

export default function DescriptionTab() {
  const isDevice = useIsDevice()
  const { alert } = useFeedback()
  const { userId, isUserRole } = useAuth()
  const position = useTabContext<PositionTypes>()

  const applyToPositionIdQuery = useMutation({
    mutationKey: [`/candidates/positions/register`, { method: 'POST' }],
    mutationFn: CandidateServices.positions.register.post,
    onSuccess: (response) => {
      alert.showSuccess('Você aplicou para a vaga com sucesso')
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const savePositionIdQuery = useMutation({
    mutationKey: [`/candidates/saved/position/register`, { method: 'POST' }],
    mutationFn: CandidateServices.positions.saved.register.post,
    onSuccess: (response) => {
      alert.showSuccess('Vaga foi salva com sucesso')
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const tabContext = useTabContext<PositionTypes>()

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box display='flex' flexDirection='column' gap={2}>
        <Typography
          variant='h3'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          {tabContext.title}
        </Typography>
        <ChipList
          chips={getChips({
            employmentType: tabContext.employmentType,
            locationType: tabContext.locationType,
            salary: tabContext.salaryRange,
          })}
        />
      </Box>
      <Box display='flex' flexDirection='column' gap={3}>
        <MarkdownViewer markdown={tabContext.longDescription} />
      </Box>
      {isUserRole.CANDIDATE && (
        <Box display='flex' gap={2}>
          <Button
            variant='contained'
            color='black'
            disabled={
              applyToPositionIdQuery.isLoading ||
              applyToPositionIdQuery.isSuccess ||
              position.archived
            }
            loading={applyToPositionIdQuery.isLoading}
            onClick={() => {
              applyToPositionIdQuery.mutate({
                candidateId: userId,
                positionId: position.id,
              })
            }}
          >
            {applyToPositionIdQuery.isIdle && 'Aplicar para vaga'}
            {applyToPositionIdQuery.isLoading && 'Aplicando...'}
            {applyToPositionIdQuery.isSuccess && 'Aplicado'}
            {position.archived && 'Vaga arquivada'}
          </Button>

          {!position.archived && (
            <>
              <Button
                variant='outlined'
                color='black'
                disabled={
                  savePositionIdQuery.isLoading || savePositionIdQuery.isSuccess
                }
                loading={savePositionIdQuery.isLoading}
                onClick={() => {
                  savePositionIdQuery.mutate({
                    candidateId: userId,
                    positionId: position.id,
                  })
                }}
              >
                {savePositionIdQuery.isIdle && 'Salvar'}
                {savePositionIdQuery.isLoading && 'Salvando...'}
                {savePositionIdQuery.isSuccess && 'Salvo'}
              </Button>
              <Button variant='text' color='black'>
                Reportar
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
