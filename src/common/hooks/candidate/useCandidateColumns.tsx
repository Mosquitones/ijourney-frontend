import React from 'react'

import { Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { DisplayHeaderComponent } from 'components'
import { CandidateTypes } from 'services'

export const useCandidateColumns = () => {
  const columnHelper = createColumnHelper<CandidateTypes>()

  const columns = [
    columnHelper.accessor('position', {
      size: 0,
      header: () => <DisplayHeaderComponent title='Posição' />,
      cell: (info) => (
        <Typography color='text.secondary'>{info.row.index + 1}</Typography>
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

  return columns
}
