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
import { useIsDevice } from 'hooks'
import { CandidateTypes, PositionServices, PositionTypes } from 'services'

import { CandidateDetailsDialog } from './components'

export default function CandidatesTab() {
  const [candidateId, setSelectedCandidateId] = useState<number | null>(null)

  const position = useTabContext<PositionTypes>()
  const candidateRankingQuery = useQuery({
    queryKey: [`/positions/${position.id}/ranking`, { method: 'GET' }],
    queryFn: () => PositionServices.id.ranking.findAll(position.id),
  })

  const columns = useCandidateColumns()
  const data = useCandidateMockData()

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box display='flex' gap={2} alignItems='center'>
        <Typography
          variant='body1'
          fontWeight={({ typography }) => typography.fontWeightBold}
          color='text.secondary'
        >
          {candidateRankingQuery.data?.length} Candidatos
        </Typography>
        {false && (
          <Typography
            variant='body2'
            fontWeight={({ typography }) => typography.fontWeightBold}
            color={({ palette }) => palette.success.dark}
          >
            (43 novos)
          </Typography>
        )}
      </Box>

      <TableComponent
        columns={columns}
        data={candidateRankingQuery.data || []}
        isLoading={candidateRankingQuery.isLoading}
        onRowClick={(row) => {
          setSelectedCandidateId(row.original.position)
        }}
      />

      <CandidateDetailsDialog
        candidateId={candidateId || undefined}
        isOpen={typeof candidateId === 'number'}
        onClose={() => {
          setSelectedCandidateId(null)
        }}
      />
    </Box>
  )
}
