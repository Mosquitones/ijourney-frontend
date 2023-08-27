import React, { useEffect, useRef } from 'react'

import { Box, CircularProgress, LinearProgress } from '@mui/material'
import { useInView } from 'framer-motion'

import { InfiniteButtonStyles } from './InfiniteButton.styles'
import { InfiniteButtonPropTypes } from './InfiniteButton.types'

export const InfiniteButtonComponent: React.FC<InfiniteButtonPropTypes> = ({
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  progressType = 'circular',
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView && hasNextPage) fetchNextPage()
  }, [isInView, hasNextPage, fetchNextPage])

  return (
    <InfiniteButtonStyles ref={ref}>
      {isFetchingNextPage && progressType === 'circular' && (
        <CircularProgress color='primary' size='3rem' sx={{ my: 2, mx: 3 }} />
      )}
      {isFetchingNextPage && progressType === 'linear' && (
        <Box width='100%'>
          <LinearProgress />
        </Box>
      )}
    </InfiniteButtonStyles>
  )
}

export * from './InfiniteButton.types'
