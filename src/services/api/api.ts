import axios from 'axios'
import i18next from 'i18next'
import { serviceInterceptors } from 'services/utils'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    Language: i18next.language,
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  },
})

serviceInterceptors(api)

export * from './api.types'
export * from './lib'
export { api }
