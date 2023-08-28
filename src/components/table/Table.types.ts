import { ReactElement } from 'react'

import { TableProps, Theme } from '@mui/material'
import { CoreOptions, Row } from '@tanstack/react-table'
import { CustomTheme } from 'common/utils'

import {
  InfiniteButtonPropTypes,
  TableRowEmptyContentPropTypes,
} from './components'

type TableTypeWithoutProps = Omit<TableProps, 'color'>

type AvailableColorTypes = Pick<
  CustomTheme['palette'],
  'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
>

export interface TablePropTypes<TData extends object>
  extends Pick<CoreOptions<TData>, 'data' | 'columns'>,
    TableTypeWithoutProps {
  renderSubComponent?: {
    subComponent: (props: { row: Row<TData> }) => ReactElement
    getRowCanExpand: (row: Row<TData>) => boolean
  }
  focused?: boolean
  isLoading?: boolean
  infiniteScroll?: InfiniteButtonPropTypes
  footer?: {
    totalDataCount: number
    pagination?: boolean
  }
  headerBgColor?: (theme: Theme) => string | undefined
  onRowClick?: (row: Row<TData>) => void
  emptyContent?: Omit<TableRowEmptyContentPropTypes, 'tableCellProps'>
  color?: keyof AvailableColorTypes
}
