import React from 'react'

import { Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { DisplayHeaderComponent } from 'components'
import { PositionRankingTypes } from 'services'

export const useCandidateColumns = () => {
  const columnHelper = createColumnHelper<PositionRankingTypes>()

  const columns = [
    columnHelper.accessor('position', {
      size: 0,
      header: () => <DisplayHeaderComponent title='Posição' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.row.index + 1}</Typography>
      ),
    }),
    columnHelper.accessor('candidateName', {
      size: 500,
      header: () => <DisplayHeaderComponent title='Nome' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor('appliedAt', {
      header: () => <DisplayHeaderComponent title='Aplicado em' />,
      cell: (info) => (
        <Typography color='text.secondary'>
          {new Date(info.getValue()).toLocaleDateString()}
        </Typography>
      ),
    }),
    columnHelper.accessor('phaseStatusType', {
      header: () => <DisplayHeaderComponent title='Status' />,
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

  return columns
}
