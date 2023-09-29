import React from 'react'

import { Box, Typography } from '@mui/material'

import * as S from './AcquisitionGeneralData.styles'
import { AcquisitionGeneralDataPropTypes } from './AcquisitionGeneralData.types'
// import { Container } from './styles';

export const AcquisitionGeneralDataProgressChart: React.FC<
  AcquisitionGeneralDataPropTypes
> = ({ application, hired, pending, rejected, selected }) => {
  const data = [
    {
      id: 'applied',
      label: 'Aplicados',
      value: application.total,
      progress: application.percentage,
      color: '#5289C9',
    },
    {
      id: 'selected',
      label: 'Selecionados',
      value: selected.total,
      progress: selected.percentage,
      color: '#2862FF',
    },
    {
      id: 'rejected',
      label: 'Rejeitados',
      value: rejected.total,
      progress: rejected.percentage,
      color: '#FF6A81',
    },
    {
      id: 'pending',
      label: 'Em espera',
      value: pending.total,
      progress: pending.percentage,
      color: '#EB4A8A',
    },
    {
      id: 'hired',
      label: 'Finalizados',
      value: hired.total,
      progress: hired.percentage,
      color: '#C64AEB',
    },
  ]

  return (
    <>
      {data.map((item) => (
        <Box display='flex' flexDirection='column' gap={2} key={item.id}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box display='flex' gap={1} alignItems='center'>
              <Typography
                fontWeight={({ typography }) => typography.fontWeightBold}
              >
                {item.value}
              </Typography>
              <Typography color='text.secondary'>{item.label}</Typography>
            </Box>
            <Typography
              fontWeight={({ typography }) => typography.fontWeightBold}
            >{`${Math.round(item.progress || 0)}%`}</Typography>
          </Box>
          <S.LinearProgress
            value={60}
            variant='determinate'
            bgColor={item.color}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      ))}
    </>
  )
}
