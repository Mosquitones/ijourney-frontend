export const ROUTES = {
  // Base
  BASE_ROOT: '/',
  UNKNOWN: '*',

  // Auth
  AUTH: 'auth',
  LOGIN: 'login',
  SIGN_UP: 'signup',
  LOGOUT: 'logout',
  TWO_FACTOR: '2fa',
  FORGOT_PASSWORD: 'forgot-password',

  // App - Dashboard
  APP: 'app',

  // Dashboard
  POSITIONS: 'positions',
  APPLIED_POSITIONS: 'applied-positions',
  ARCHIVED_POSITIONS: 'archived-positions',
  CLASSIFICATION: 'classification',
  COURSES: 'courses',
  ABOUT_US: 'about-us',
  REPORTS: 'reports',
  CANDIDATES: 'candidates',

  PROFILES: 'profiles',
  RECRUITERS: 'recruiters',

  // General
  NEW: 'new',

  // Params
  ID: ':id',
  POSITION_ID: ':positionId',
  PROFILE_ID: ':profileId',
} as const

export type RouteTypes = (typeof ROUTES)[keyof typeof ROUTES] | 'default'
