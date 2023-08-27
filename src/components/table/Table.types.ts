import { ReactElement } from 'react'

import { TableProps, Theme } from '@mui/material'
import { CoreOptions, Row } from '@tanstack/react-table'

import {
  InfiniteButtonPropTypes,
  TableRowEmptyContentPropTypes,
} from './components'

export interface TablePropTypes<TData extends object>
  extends Pick<CoreOptions<TData>, 'data' | 'columns'>,
    TableProps {
  renderSubComponent?: {
    subComponent: (props: { row: Row<TData> }) => ReactElement
    getRowCanExpand: (row: Row<TData>) => boolean
  }
  isLoading?: boolean
  infiniteScroll?: InfiniteButtonPropTypes
  footer?: {
    totalDataCount: number
    pagination?: boolean
  }
  headerBgColor?: (theme: Theme) => string | undefined
  onRowClick?: (row: Row<TData>) => void
  emptyContent?: Omit<TableRowEmptyContentPropTypes, 'tableCellProps'>
}
