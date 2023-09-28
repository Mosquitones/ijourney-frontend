export type ApiResponseTypes<T> = {
  message: string
  data: T
  statusCode: number
  statusMessage: string
}
