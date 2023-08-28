/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState } from 'react'

import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  RotateLeftOutlined,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  LinearProgress,
  Skeleton,
  SvgIcon,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  flexRender,
  getExpandedRowModel,
  ExpandedState,
  ColumnFiltersState,
  getFacetedRowModel,
  SortingColumn,
  HeaderContext,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

import {
  InfiniteButtonComponent,
  TableRowEmptyContentComponent,
} from './components'
import { TableStyles } from './Table.styles'
import { TablePropTypes } from './Table.types'

type TDataObjectTypes<TData> = object & { subRows?: TData[] }

const SortingHeader = <TData extends object>({
  sortDirection,
  onClick,
  headerContent,
}: {
  onClick: SortingColumn<TData>['getToggleSortingHandler']
  headerContent: React.ReactNode
  sortDirection: SortingColumn<TData>['getIsSorted']
}) => {
  const hasSortDirection = Boolean(sortDirection())
  const sortIcon =
    sortDirection() === 'asc' ? KeyboardArrowUp : KeyboardArrowDown

  return (
    <Box
      role='presentation'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      gap={0.5}
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={onClick()}
    >
      {headerContent}
      <SvgIcon
        component={hasSortDirection ? sortIcon : Box}
        sx={{ fontSize: 16, marginRight: -0.5 }}
      />
    </Box>
  )
}

export const TableComponent = <TData extends TDataObjectTypes<TData>>({
  data,
  columns,
  isLoading = false,
  footer,
  renderSubComponent,
  infiniteScroll,
  sx,
  headerBgColor,
  onRowClick,
  color,
  focused,
  emptyContent,
  ...rest
}: TablePropTypes<TData>) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: renderSubComponent?.getRowCanExpand,
    state: {
      columnFilters,
      expanded,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    manualPagination: true,
  })

  return (
    <TableContainer
      sx={{
        ...sx,
        border: ({ palette }) =>
          `${focused ? '0.3rem' : '0.1rem'} solid ${
            color ? palette[color].main : palette.divider
          }`,
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <TableStyles
        {...rest}
        width={table.getCenterTotalSize()}
        headerBgColor={headerBgColor ? headerBgColor(theme) : null}
        rowBgColor={color}
      >
        {rest['aria-label'] && <caption>{rest['aria-label']}</caption>}
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const headerContent = header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )

                const isSortable = header.column.getCanSort()

                return (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    width={header.getSize()}
                  >
                    {isSortable ? (
                      <SortingHeader
                        onClick={header.column.getToggleSortingHandler}
                        headerContent={headerContent}
                        sortDirection={header.column.getIsSorted}
                      />
                    ) : (
                      headerContent
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableCell
              colSpan={table.getAllColumns().length}
              sx={{
                backgroundColor: ({ palette }) => palette.background.paper,
              }}
            >
              <LinearProgress />
              <Divider />
              <Box
                display='flex'
                flexDirection='column'
                py={5}
                justifyContent='center'
                alignItems='center'
                textAlign='center'
              >
                <Typography
                  variant='body1'
                  fontWeight={(theme) => theme.typography.fontWeightBold}
                >
                  Carregando...
                </Typography>
              </Box>
            </TableCell>
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRowEmptyContentComponent
              {...emptyContent}
              tableCellProps={{
                colSpan: table.getAllColumns().length,
              }}
            />
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <>
                <TableRow
                  key={row.id}
                  sx={{
                    outline: '0.1rem solid transparent',
                    border: '0.1rem solid transparent',
                  }}
                  {...(onRowClick && {
                    tabIndex: 0,
                    role: 'button',
                    onKeyUp: (e: React.KeyboardEvent<HTMLTableRowElement>) => {
                      if (e.key === 'Enter') onRowClick(row)
                    },
                    onClick: () => onRowClick(row),
                    sx: {
                      cursor: 'pointer',
                      '&:hover': {
                        outline: ({ palette }) =>
                          `0.1rem solid ${palette.primary.main}`,
                        border: ({ palette }) =>
                          `0.1rem solid ${palette.primary.main}`,
                      },
                    },
                  })}
                >
                  {row.getVisibleCells().map((cell) => {
                    const headerContent = flexRender(
                      cell.column.columnDef.header,
                      cell.getContext() as unknown as HeaderContext<
                        TData,
                        unknown
                      >
                    )

                    const columnTitle = React.isValidElement(headerContent)
                      ? headerContent.props.column.columnDef.header().props
                          .title
                      : undefined

                    return (
                      <TableCell
                        key={cell.id}
                        width={cell.column.getSize()}
                        data-cell={(cell.column.columnDef.meta
                          ? cell.column.columnDef.meta.dataCell
                          : columnTitle
                        ).concat(':')}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
                {renderSubComponent && row.getIsExpanded() && (
                  <TableRow
                    key={row.id.concat(index.toString())}
                    className='sub-component'
                  >
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {renderSubComponent.subComponent({ row })}
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          )}
        </TableBody>
        {/* this button can be refactored with infinite table scroll from @tanstack/react-table */}
        {infiniteScroll && (
          <TableCell
            colSpan={table.getAllColumns().length}
            padding='none'
            sx={{ border: 'none' }}
          >
            <InfiniteButtonComponent
              {...infiniteScroll}
              progressType='linear'
            />
          </TableCell>
        )}
      </TableStyles>
      {footer && !isLoading && table.getRowModel().rows.length > 0 && (
        <Box
          position='sticky'
          bottom={0}
          bgcolor='white'
          py={2}
          px={3}
          borderTop={({ palette }) => `0.1rem solid ${palette.divider}`}
          display='flex'
          justifyContent={footer.pagination ? 'space-between' : 'flex-end'}
          alignItems='center'
          gap={2}
          flexWrap='wrap'
        >
          <Typography>
            {t('general.showingOf', {
              visibleRows: table.getRowModel().rows.length,
              totalDataRows: footer.totalDataCount,
            })}
          </Typography>
        </Box>
      )}
    </TableContainer>
  )
}

export * from './components'
export * from './Table.types'
