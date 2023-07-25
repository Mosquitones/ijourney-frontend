import React from 'react'

import {
  Button,
  DisplayHeaderComponent,
  TableComponent,
  SearchComponent,
  FormatNumberCurrencyTypes,
  formatNumberToPercent,
  formatNumberToCurrency,
} from '@eduplaytion/numetry-ui-kit'
import { Add, MoreVert } from '@mui/icons-material'
import { Box, Divider, IconButton, Link, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { Link as RouterLink } from 'react-router-dom'

type PlanTypes = {
  name: string
  currency: FormatNumberCurrencyTypes
  status: boolean
  recurrence: 'yearly' | 'half-yearly' | 'monthly'
  planType: 'promotion' | 'basic'
  discountPercentage: number
  totalPrice: number
  pricePerMonth: number
}

const data: PlanTypes[] = [
  {
    name: 'Basic',
    currency: 'NOK',
    status: false,
    recurrence: 'yearly',
    planType: 'basic',
    discountPercentage: 0,
    totalPrice: 1000,
    pricePerMonth: 100,
  },
  {
    name: 'Promotion',
    currency: 'EUR',
    status: true,
    recurrence: 'yearly',
    planType: 'promotion',
    discountPercentage: 0.3,
    totalPrice: 1300,
    pricePerMonth: 80,
  },
  {
    name: 'Basic 2',
    currency: 'USD',
    status: false,
    recurrence: 'monthly',
    planType: 'basic',
    discountPercentage: 0,
    totalPrice: 800,
    pricePerMonth: 80,
  },
]

export default function PlansPage() {
  const columnHelper = createColumnHelper<PlanTypes>()

  const columns = [
    columnHelper.accessor('name', {
      enableSorting: true,
      header: () => <DisplayHeaderComponent title='!#Plan' />,
      meta: {
        dataCell: '!#Plan',
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
    columnHelper.accessor('currency', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Currency' />,
      meta: {
        dataCell: '!#Currency',
      },
      cell: (info) => <Typography>{info.getValue()}</Typography>,
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
    columnHelper.accessor('recurrence', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Recurrence' />,
      meta: {
        dataCell: '!#Recurrence',
      },
      cell: (info) => <Typography>{info.getValue()}</Typography>,
    }),
    columnHelper.accessor('planType', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Plan Type' />,
      meta: {
        dataCell: '!#Plan Type',
      },
      cell: (info) => <Typography>{info.getValue()}</Typography>,
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
    columnHelper.accessor('totalPrice', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Total Price' />,
      meta: {
        dataCell: '!#Total Price',
      },
      cell: (info) => {
        const value = formatNumberToCurrency(info.getValue(), {
          currency: info.row.original.currency,
        })
        return <Typography>{value.formattedValue}</Typography>
      },
    }),
    columnHelper.accessor('pricePerMonth', {
      enableSorting: false,
      header: () => <DisplayHeaderComponent title='!#Price per month' />,
      meta: {
        dataCell: '!#Price per month',
      },
      cell: (info) => {
        const value = formatNumberToCurrency(info.getValue(), {
          currency: info.row.original.currency,
        })
        return <Typography>{value.formattedValue}</Typography>
      },
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
          value='!#Create Plan'
          variant='contained'
          color='primary'
          startIcon={<Add />}
          sx={{ minWidth: 'min-content' }}
        />
        <Box width='100%' maxWidth={{ md: 400 }}>
          <SearchComponent
            name='search-plan'
            placeholder='!#Search for a plan'
          />
        </Box>
      </Box>
      <Divider />
      <TableComponent
        columns={columns}
        data={[...Array(1)].map(() => data).flat()}
        footer={{
          totalDataCount: data.length,
        }}
      />
    </div>
  )
}
