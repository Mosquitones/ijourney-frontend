import React from 'react'

import { InboxOutlined } from '@mui/icons-material'
import { TableCell, Typography, Box, SvgIcon } from '@mui/material'

import { TableRowEmptyContentPropTypes } from './TableRowEmptyContent.types'

export const TableRowEmptyContentComponent: React.FC<
  TableRowEmptyContentPropTypes
> = ({ tableCellProps, description, title }) => {
  return (
    <TableCell
      {...tableCellProps}
      sx={{
        backgroundColor: ({ palette }) => palette.background.paper,
        ...tableCellProps?.sx,
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap={1}
        justifyContent='center'
        alignItems='center'
        p={3}
      >
        <SvgIcon component={InboxOutlined} sx={{ fontSize: 62 }} />

        <Box
          display='flex'
          flexDirection='column'
          gap={1}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          maxWidth={500}
        >
          <Typography
            variant='h6'
            fontWeight={(theme) => theme.typography.fontWeightBold}
          >
            {title || 'Nenhum resultado encontrado'}
          </Typography>
          <Typography variant='body2'>
            {description ||
              'Nenhuma resultado foi encontrado nesta tabela, tente criar um novo item ou atualize a página com F5.'}
          </Typography>
        </Box>
      </Box>
    </TableCell>
  )
}

export * from './TableRowEmptyContent.types'
