/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  BusinessCenter,
  Circle,
  Place,
  QueryBuilder,
} from '@mui/icons-material'
import { Avatar, Box, Chip, SvgIcon, Typography } from '@mui/material'

import { useIsDevice } from 'hooks'

import * as S from './PositionCard.styles'

export const PositionCard: React.FC = () => {
  const isDevice = useIsDevice()
  return (
    <S.Button>
      <S.Paper>
        <S.Header>
          <S.HeaderMainContent>
            <Avatar
              sx={{
                bgcolor: ({ palette }) => palette.primary.main,
                width: 54,
                height: 54,
              }}
              variant='rounded'
            >
              <BusinessCenter />
            </Avatar>
            <Box display='flex' flexDirection='column' gap={1}>
              <Typography
                fontWeight={({ typography }) => typography.fontWeightBold}
              >
                Company
              </Typography>
              <Box
                display='flex'
                flexWrap='wrap'
                // overflow='auto'
                flexDirection='row'
                gap={1}
                alignItems='center'
              >
                {[...Array(5)].map((_, i) => (
                  <>
                    {i !== 0 && isDevice.from.sm && (
                      <Circle
                        sx={{ fontSize: '0.5rem', color: 'text.secondary' }}
                      />
                    )}
                    <Chip
                      label={<Typography variant='body2'>Item</Typography>}
                    />
                  </>
                ))}
              </Box>
            </Box>
          </S.HeaderMainContent>
          <S.HeaderInfoContent>
            <Box display='flex' gap={1} alignItems='center'>
              <SvgIcon component={Place} sx={{ fontSize: '1.8rem' }} />
              <Typography
                fontWeight={({ typography }) => typography.fontWeightBold}
                variant='body2'
              >
                Vila Mariana, São Paulo
              </Typography>
            </Box>
            <Box display='flex' gap={1} alignItems='center'>
              {isDevice.to.md && (
                <SvgIcon
                  component={QueryBuilder}
                  sx={{ fontSize: '1.8rem', color: 'text.secondary' }}
                />
              )}
              <Typography color='text.secondary' variant='body2'>
                Postado há 5 min atrás
              </Typography>
            </Box>
          </S.HeaderInfoContent>
        </S.Header>
        <S.Body>
          <Typography color='text.secondary' variant='body2'>
            Within this role, you will be creating content for a wide range of
            local and international clients. This role is suited to Bali based
            creatives looking to work in-house.
          </Typography>
        </S.Body>
      </S.Paper>
    </S.Button>
  )
}
