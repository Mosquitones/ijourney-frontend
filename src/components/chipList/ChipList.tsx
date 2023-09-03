import React from 'react'

import { Circle } from '@mui/icons-material'
import { Box, Chip, Typography } from '@mui/material'

import { useIsDevice } from 'hooks'

import { ChipListPropTypes } from './ChipList.types'

export const ChipList: React.FC<ChipListPropTypes> = ({ chips }) => {
  const isDevice = useIsDevice()

  return (
    <Box
      display='flex'
      flexWrap='wrap'
      flexDirection='row'
      gap={1}
      alignItems='center'
    >
      {chips.map((chip, i) => (
        <Box
          key={crypto.randomUUID() + i}
          display='flex'
          flexWrap='wrap'
          gap={1}
          alignItems='center'
        >
          {i !== 0 && isDevice.from.sm && (
            <Circle sx={{ fontSize: '0.5rem', color: 'text.secondary' }} />
          )}
          <Chip label={<Typography variant='body2'>{chip}</Typography>} />
        </Box>
      ))}
    </Box>
  )
}

export * from './ChipList.types'
