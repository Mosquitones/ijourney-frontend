import { AxiosInstance } from 'axios'

export const serviceInterceptors = (api: AxiosInstance) =>
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  )
