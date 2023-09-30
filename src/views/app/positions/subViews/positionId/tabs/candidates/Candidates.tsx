/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'

import {
  BusinessCenter,
  KeyboardBackspaceOutlined,
  PlaceOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import {
  Autocomplete,
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
import { createColumnHelper } from '@tanstack/react-table'
import { useCandidateColumns } from 'common/hooks'
import { useCandidateMockData } from 'common/hooks/candidate/useCandidateMockData'
import { useQuery } from 'react-query'

import {
  Banner,
  Button,
  ChipList,
  DisplayHeaderComponent,
  Input,
  MarkdownViewer,
  TableComponent,
} from 'components'
import { useTabContext } from 'contexts'
import { useIsDevice, useParamsSelector } from 'hooks'
import {
  CandidatePositionTypes,
  CandidateTypes,
  PositionRankingTypes,
  PositionServices,
  PositionTypes,
} from 'services'

import { CandidateDetailsDialog } from './components'

export default function CandidatesTab() {
  const params = useParamsSelector<'currentPhaseIndex'>()

  const currentPhaseIndexParam = params.get('currentPhaseIndex')
  const currentPhaseIndex = currentPhaseIndexParam
    ? Number(currentPhaseIndexParam)
    : -1

  const position = useTabContext<PositionTypes>()

  const positionRankingQuery = useQuery({
    queryKey: [
      `/positions/${position.id}/ranking`,
      { method: 'GET', query: { currentPhaseIndex } },
    ],
    queryFn: () =>
      PositionServices.id.ranking.findAll(position.id, { currentPhaseIndex }),
  })

  const [candidatePositionId, setSelectedCandidatePositionId] = useState<
    CandidatePositionTypes['candidatePositionId'] | null
  >(null)

  const columns = useCandidateColumns()

  const selectedCurrentPhaseIndex = useMemo(
    () =>
      position.phases.find(
        (phase) => phase.sequenceIndex === currentPhaseIndex
      ),
    [currentPhaseIndex, position.phases]
  )

  useEffect(() => {
    if (currentPhaseIndex === -1) {
      params.delete('currentPhaseIndex')
    }
  }, [currentPhaseIndex, currentPhaseIndexParam, params])

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box
        display='flex'
        gap={2}
        alignItems='center'
        justifyContent='space-between'
        flexWrap='wrap'
      >
        <Typography
          variant='body1'
          fontWeight={({ typography }) => typography.fontWeightBold}
          color='text.secondary'
          flex={1}
        >
          {positionRankingQuery.data?.length} Candidatos
        </Typography>
        <Autocomplete
          id='current-phase-autocomplete-box'
          autoHighlight
          disablePortal
          fullWidth
          sx={{ maxWidth: 350 }}
          value={selectedCurrentPhaseIndex}
          inputValue={selectedCurrentPhaseIndex?.name}
          options={position.phases.sort(
            (a, b) => a.sequenceIndex - b.sequenceIndex
          )}
          getOptionLabel={(option) => option.name}
          defaultValue={null}
          onChange={(_, phase, reason) => {
            if (reason === 'clear') params.delete('currentPhaseIndex')
            if (phase && phase.sequenceIndex !== currentPhaseIndex) {
              params.add({
                key: 'currentPhaseIndex',
                value: String(phase.sequenceIndex),
              })
            }
          }}
          noOptionsText='Status de fase não encontrado'
          renderInput={(params) => {
            params.id = 'currentPhaseIndex'

            return (
              <Input
                {...params}
                name={params.id}
                placeholder='Filtre pelo status da vaga'
              />
            )
          }}
        />
      </Box>

      <TableComponent
        columns={columns}
        data={
          positionRankingQuery.data?.sort((a, b) => a.position - b.position) ||
          []
        }
        isLoading={positionRankingQuery.isLoading}
        onRowClick={(row) => {
          setSelectedCandidatePositionId(row.original.candidatePositionId)
        }}
      />

      <CandidateDetailsDialog
        refetchRanking={positionRankingQuery.refetch}
        candidatePositionId={candidatePositionId || undefined}
        isOpen={typeof candidatePositionId === 'number'}
        onClose={() => {
          setSelectedCandidatePositionId(null)
        }}
      />
    </Box>
  )
}
