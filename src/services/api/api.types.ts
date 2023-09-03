/* eslint-disable @typescript-eslint/ban-types */
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

export type ApiResponseTypes<T> = {
  headers: {}
  body: {
    data: T
    status: number
    message: string
  }
  statusCode: string
  statusCodeValue: number
}

export interface PaginatedResponse<T>
  extends Omit<ApiResponseTypes<T>, 'data'> {
  data: T[]
  pagination: {
    dataCount: number
    pageNumber: number
    pageSize: number
    totalRowCount: number
  }
}
