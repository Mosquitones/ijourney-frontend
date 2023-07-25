import './i18n/i18n'

import React, { Suspense } from 'react'

import { GlobalStyles, MuiThemeWrapper } from '@eduplaytion/numetry-ui-kit'
import { ErrorBoundary } from '@sentry/react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { SnackbarProvider } from 'notistack'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalContextWrapper } from './contexts'
import { BackdropComponent, Router } from './router'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
})

export const App: React.FC = () => (
  <AnimatePresence mode='wait'>
    <Suspense fallback={<BackdropComponent open />}>
      <ErrorBoundary>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              maxSnack={5}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              autoHideDuration={6000}
            >
              <MotionConfig
                transition={{
                  type: 'spring',
                  damping: 10,
                  mass: 0.75,
                  stiffness: 100,
                  duration: 0.35,
                }}
              >
                <GlobalContextWrapper>
                  <MuiThemeWrapper>
                    <>
                      <GlobalStyles />
                      <Router />
                    </>
                  </MuiThemeWrapper>
                </GlobalContextWrapper>
              </MotionConfig>
            </SnackbarProvider>
          </QueryClientProvider>
        </CookiesProvider>
      </ErrorBoundary>
    </Suspense>
  </AnimatePresence>
)
