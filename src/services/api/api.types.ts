export interface PaginatedApiParamsTypes {
  page?: string | number
  pageSize?: number
  search?: string | null
  assignmentStatus?: 'active' | 'planned' | 'completed' | string
  filterBy?: string | null
  skillId?: string | null
  topicId?: string | null
  planetId?: string | null
  orderBy?: string
  orderType?: 'ASC' | 'DESC'
  withProgress?: boolean
  withCustomGroups?: boolean
  showInactive?: boolean
  userGroupId?: string | null
}

export type ApiPropTypes = {
  params: PaginatedApiParamsTypes
}

export type ApiResponseTypes<T> = {
  data: T
  statusCode: number
  message: string
}

export type ApiPaginationDataTypes = {
  dataCount: number
  pageNumber: number
  pageSize: number
  totalRowCount: number
}
export interface PaginatedResponse<T>
  extends Omit<ApiResponseTypes<T>, 'data'> {
  data: T[]
  pagination: ApiPaginationDataTypes
}
