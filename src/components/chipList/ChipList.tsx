import React from 'react'

import { Circle } from '@mui/icons-material'
import { Box, Chip, Typography } from '@mui/material'

import { useIsDevice } from 'hooks'

export const ChipList: React.FC = () => {
  const isDevice = useIsDevice()

  return (
    <Box
      display='flex'
      flexWrap='wrap'
      flexDirection='row'
      gap={1}
      alignItems='center'
    >
      {[...Array(5)].map((_, i) => (
        <>
          {i !== 0 && isDevice.from.sm && (
            <Circle sx={{ fontSize: '0.5rem', color: 'text.secondary' }} />
          )}
          <Chip label={<Typography variant='body2'>Item</Typography>} />
        </>
      ))}
    </Box>
  )
}
