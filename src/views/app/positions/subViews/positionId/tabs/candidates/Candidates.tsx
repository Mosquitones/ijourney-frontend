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

import {
  Banner,
  Button,
  ChipList,
  DisplayHeaderComponent,
  Input,
  MarkdownViewer,
  TableComponent,
} from 'components'
import { useIsDevice } from 'hooks'

import { CandidateDetailsDialog } from './components'

type CandidateTypes = {
  id: number
  position: number
  name: string
  location: string
  appliedAt: Date
  timeSpent: number
  points: number
}

export default function CandidatesPage() {
  const isDevice = useIsDevice()
  const [candidateId, setSelectedCandidateId] = useState<number | null>(null)

  const columnHelper = createColumnHelper<CandidateTypes>()

  const columns = [
    columnHelper.accessor('position', {
      size: 0,
      header: () => <DisplayHeaderComponent title='Posição' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor('name', {
      size: 500,
      header: () => <DisplayHeaderComponent title='Nome' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor('location', {
      header: () => <DisplayHeaderComponent title='Localização' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor('appliedAt', {
      header: () => <DisplayHeaderComponent title='Aplicado em' />,
      cell: (info) => (
        <Typography color='text.secondary'>
          {info.getValue().toLocaleDateString()}
        </Typography>
      ),
    }),
    columnHelper.accessor('timeSpent', {
      header: () => <DisplayHeaderComponent title='Tempo gasto' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor('points', {
      header: () => <DisplayHeaderComponent title='Pontos' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.getValue()}</Typography>
      ),
    }),
  ]

  const data: CandidateTypes[] = [
    {
      id: 0,
      position: 1,
      name: 'John Doe',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 580,
    },
    {
      id: 1,
      position: 2,
      name: 'Brandon Gustavo',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 10,
    },
    {
      id: 2,
      position: 3,
      name: 'Myke Baguncinha',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 10,
    },
    {
      id: 3,
      position: 4,
      name: 'Renato Toguro',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 10,
    },
  ]

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box display='flex' gap={2} alignItems='center'>
        <Typography
          variant='body1'
          fontWeight={({ typography }) => typography.fontWeightBold}
          color='text.secondary'
        >
          70 Candidatos
        </Typography>
        <Typography
          variant='body2'
          fontWeight={({ typography }) => typography.fontWeightBold}
          color={({ palette }) => palette.success.dark}
        >
          (43 novos)
        </Typography>
      </Box>

      <TableComponent
        columns={columns}
        data={data}
        onRowClick={(row) => {
          setSelectedCandidateId(row.original.id)
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
