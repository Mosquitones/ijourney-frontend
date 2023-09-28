/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Avatar, AvatarProps, Box, Typography } from '@mui/material'
import { BoxProps } from '@mui/material/Box'
import { createColumnHelper } from '@tanstack/react-table'

import { DisplayHeaderComponent } from 'components'
import { PositionRankingTypes } from 'services'

const POSITION_TOP_3_STYLES: Record<number | 'DEFAULT', BoxProps> = {
  1: {
    bgcolor: '#F2C948',
    color: 'white',
  },
  2: {
    bgcolor: '#C5D1DD',
    color: 'white',
  },
  3: {
    bgcolor: '#DCB083',
    color: 'white',
  },
  DEFAULT: {
    bgcolor: 'transparent',
    sx: { color: 'text.secondary' },
  },
}

const isTop3 = (value: number) => {
  return value === 1 || value === 2 || value === 3
}

const getRankingBoxProps = (value: number) => {
  return isTop3(value)
    ? POSITION_TOP_3_STYLES[value]
    : POSITION_TOP_3_STYLES.DEFAULT
}

export const useCandidateColumns = () => {
  const columnHelper = createColumnHelper<PositionRankingTypes>()

  const columns = [
    columnHelper.accessor('position', {
      size: 0,
      header: () => <DisplayHeaderComponent title='Posição' />,
      cell: (info) => {
        const boxProps = getRankingBoxProps(info.getValue())

        return (
          <Box
            {...boxProps}
            width={40}
            height={40}
            display='flex'
            alignItems='center'
            justifyContent='center'
            borderRadius={20}
          >
            <Typography
              color='inherit'
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              {info.getValue()}
            </Typography>
          </Box>
        )
      },
    }),
    columnHelper.accessor('candidateName', {
      size: 500,
      header: () => <DisplayHeaderComponent title='Nome' />,
      cell: (info) => {
        const name = info.getValue()

        const initialNameLetters = `${name.split(' ')?.[0]?.[0] || ''}${
          name.split(' ')?.[1]?.[0] || ''
        }`

        return (
          <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
            <Avatar
              variant='rounded'
              src={info.row.original.picture || undefined}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '0.8rem',
                bgcolor: ({ palette }) => `${palette.grey[50]}50`,
                color: 'text.secondary',
              }}
            >
              <Typography
                variant='caption'
                fontWeight={({ typography }) => typography.fontWeightBold}
                color='inherit'
              >
                {initialNameLetters}
              </Typography>
            </Avatar>
            <Typography color='text.secondary'>{info.getValue()}</Typography>
          </Box>
        )
      },
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
