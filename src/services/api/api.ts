import axios from 'axios'
import i18next from 'i18next'

import { serviceInterceptors } from '../utils'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Language: i18next.language,
  },
})

serviceInterceptors(api)

export * from './api.types'
export * from './lib'
export { api }
