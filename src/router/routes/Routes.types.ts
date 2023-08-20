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

  // App - Dashboard
  APP: 'app',

  // Dashboard
  POSITIONS: 'positions',
  APPLIED_POSITIONS: 'applied-positions',
  COURSES: 'courses',
  ABOUT_US: 'about-us',
  REPORTS: 'reports',

  // General
  NEW: 'new',

  // Params
  ID: ':id',
} as const

export type RouteTypes = (typeof ROUTES)[keyof typeof ROUTES] | 'default'
