import React from 'react'

import {
  Button,
  DisplayHeaderComponent,
  TableComponent,
  SearchComponent,
  formatNumberToPercent,
} from '@eduplaytion/numetry-ui-kit'
import { Add, MoreVert } from '@mui/icons-material'
import { Box, Divider, IconButton, Link, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Link as RouterLink } from 'react-router-dom'

type PromotionCodeTypes = {
  name: string
  description: string
  code: string
  discountValue: number
  discountPercentage: number
  usage: number
  startDate: Date
  expirationDate: Date
  status: boolean
}

const data: PromotionCodeTypes[] = [
  {
    name: 'EarlyBird',
    description: 'EarlyBird Discount',
    code: 'EARLYBIRD30',
    discountValue: 0,
    discountPercentage: 0.3,
    usage: 2,
    startDate: new Date(),
    expirationDate: new Date(),
    status: false,
  },
  {
    name: 'NUMETRY50',
    description: '50% MVP Campaign',
    code: 'NUMETRY50',
    discountValue: 0,
    discountPercentage: 0.5,
    usage: 2,
    startDate: new Date(),
    expirationDate: new Date(),
    status: true,
  },
  {
    name: 'BESTMATHGAME',
    description: '20% Discount',
    code: 'BESTMATHGAME',
    discountValue: 0,
    discountPercentage: 0.15,
    usage: 150,
    startDate: new Date(),
    expirationDate: new Date(),
    status: false,
  },
]

export default function DiscountCodesPage() {
  const columnHelper = createColumnHelper<PromotionCodeTypes>()

  const columns = [
    columnHelper.accessor('name', {
      enableSorting: true,
      header: () => <DisplayHeaderComponent title='!#Code name' />,
      meta: {
        dataCell: '!#Code name',
      },
      cell: (info) => (
        <Link
          component={RouterLink}
          to='#'
          underline='none'
          noWrap
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('description', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Description' />,
      meta: {
        dataCell: '!#Description',
      },
      cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
    }),
    columnHelper.accessor('code', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Code' />,
      meta: {
        dataCell: '!#Code',
      },
      cell: (info) => <Typography>{info.getValue()}</Typography>,
    }),
    columnHelper.accessor('discountValue', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Discount value' />,
      meta: {
        dataCell: '!#Discount value',
      },
      cell: (info) => {
        const formattedValue = String(info.getValue()).padStart(4, '0')
        return <Typography>{formattedValue}</Typography>
      },
    }),
    columnHelper.accessor('discountPercentage', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Discount %' />,
      meta: {
        dataCell: '!#Discount %',
      },
      cell: (info) => (
        <Typography>{formatNumberToPercent(info.getValue())}</Typography>
      ),
    }),
    columnHelper.accessor('usage', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Usage' />,
      meta: {
        dataCell: '!#Usage',
      },
      cell: (info) => <Typography>{info.getValue()}</Typography>,
    }),
    columnHelper.accessor('startDate', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Start date' />,
      meta: {
        dataCell: '!#Start date',
      },
      cell: (info) => (
        <Typography noWrap>{format(info.getValue(), 'yyyy-mm-dd')}</Typography>
      ),
    }),
    columnHelper.accessor('expirationDate', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Expiration date' />,
      meta: {
        dataCell: '!#Expiration date',
      },
      cell: (info) => (
        <Typography noWrap>{format(info.getValue(), 'yyyy-mm-dd')}</Typography>
      ),
    }),
    columnHelper.accessor('status', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Status' />,
      meta: {
        dataCell: '!#Status',
      },
      cell: (info) => (
        <Typography>{info.getValue() ? '!#Enabled' : '!#Disabled'}</Typography>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <Box display='flex' gap={3} justifyContent='space-between'>
          <Button
            value={info.row.original.status ? '!#Disable' : '!#Enable'}
            variant={info.row.original.status ? 'text' : 'contained'}
            color='secondary'
          />
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
      ),
    }),
  ]

  return (
    <div style={{ maxWidth: '100%' }}>
      <Box
        display='flex'
        alignItems={{ md: 'center' }}
        justifyContent='space-between'
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={2}
        py={2}
        px={3}
      >
        <Button
          value='!#Create Code'
          variant='contained'
          color='primary'
          startIcon={<Add />}
          sx={{ minWidth: 'min-content' }}
        />
        <Box width='100%' maxWidth={{ md: 400 }}>
          <SearchComponent
            name='search-plan'
            placeholder='!#Search for a discount code'
          />
        </Box>
      </Box>
      <Divider />
      <TableComponent
        columns={columns}
        data={[...Array(5)].map(() => data).flat()}
        footer={{
          totalDataCount: data.length,
        }}
      />
    </div>
  )
}
