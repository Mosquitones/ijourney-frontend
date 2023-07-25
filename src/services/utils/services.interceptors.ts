import { AxiosInstance } from 'axios'

export const serviceInterceptors = (api: AxiosInstance) =>
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // eslint-disable-next-line no-console
      console.error(
        `Looks like there was a problem. Status Code: ${error.response.status}`
      )
      return Promise.reject(error)
    }
  )
