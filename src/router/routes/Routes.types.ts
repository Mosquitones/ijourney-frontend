export const ROUTES = {
  // Base
  BASE_ROOT: '/',
  UNKNOWN: '*',

  // Auth
  AUTH: 'auth',
  LOGIN: 'login',
  LOGOUT: 'logout',
  TWO_FACTOR: '2fa',
  FORGOT_PASSWORD: 'forgot-password',

  // Dashboard
  PLANS: 'plans',
  DISCOUNT_CODES: 'discount-codes',

  // General
  NEW: 'new',

  // Params
  ID: ':id',
} as const

export type RouteTypes = (typeof ROUTES)[keyof typeof ROUTES] | 'default'
