import { AxiosInstance } from 'axios'

export const ServiceInterceptors = (api: AxiosInstance) =>
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(
        `Looks like there was a problem. Status Code: ${error.response.status}`
      )
      return Promise.reject(error)
    }
  )
