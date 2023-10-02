/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Box, Divider, Link, Typography } from '@mui/material'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { PositionDetailsPropTypes } from './PositionDetails.types'

const DetailTextComponent: React.FC<{
  title: string
  value: string
}> = ({ title, value }) => {
  return (
    <Typography
      variant='body1'
      color='text.secondary'
      display='flex'
      gap={1}
      flexWrap='wrap'
    >
      <Typography fontWeight={({ typography }) => typography.fontWeightBold}>
        {title}
      </Typography>
      {value}
    </Typography>
  )
}

export const PositionDetails: React.FC<PositionDetailsPropTypes> = ({
  title = 'Detalhes',
  appliedAt,
  expireAt,
  savedAt,
  createdAt,
  recruiter,
}) => {
  const formatDate = (date: Date) =>
    format(date, 'dd/MM/yyyy', { locale: ptBR })

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
      >
        {title}
      </Typography>
      <Box display='flex' flexDirection='column' gap={0.5}>
        {appliedAt && (
          <DetailTextComponent
            title='Aplicado em:'
            value={formatDate(appliedAt)}
          />
        )}
        {/* {createdAt && (
          <DetailTextComponent
            title='Criada em:'
            value={}
          />
        )} */}
        {expireAt && (
          <DetailTextComponent title='Vence em:' value={formatDate(expireAt)} />
        )}
        {recruiter && (
          <Box display='flex' gap={1} alignItems='center' flexWrap='wrap'>
            <DetailTextComponent
              title='Criado por:'
              value={recruiter.fullName}
            />
            <Divider flexItem orientation='vertical' />

            {createdAt && (
              <Typography color='text.secondary' variant='body2'>
                {formatDate(createdAt)}
              </Typography>
            )}
            {savedAt && (
              <Typography color='text.secondary' variant='body2'>
                {formatDate(savedAt)}
              </Typography>
            )}
            <Divider flexItem orientation='vertical' />
            <Link
              component={Typography}
              variant='body2'
              href={`mailto:${recruiter.email}`}
              color='text.secondary'
              underline='hover'
              sx={{
                cursor: 'pointer',
              }}
            >
              {recruiter.email}
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  )
}
