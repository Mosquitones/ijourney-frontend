/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Avatar, Box, Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Button } from 'components'
import { openPdfInAnotherPage } from 'utils'

import * as S from './UserProfileCard.styles'
import { UserProfileCardPropTypes } from './UserProfileCard.types'

export const UserProfileCard: React.FC<UserProfileCardPropTypes> = ({
  user,
  ...rest
}) => {
  const navigate = useNavigate()

  return (
    <S.Button {...rest} fullWidth onClick={() => navigate(`${user?.id}`)}>
      <S.Paper
        sx={{
          borderRadius: 2,
          boxShadow: ({ palette }) => `0 0.3rem 1rem ${palette.common.black}09`,
        }}
      >
        <S.Wrapper>
          <S.Header p={2}>
            <Avatar
              variant='rounded'
              sx={{ width: 56, height: 56, borderRadius: 6 }}
              src={user?.picture || undefined}
            />
            <Box display='flex' flexDirection='column' gap={0.5}>
              <Typography
                variant='h6'
                fontWeight={({ typography }) => typography.fontWeightBold}
              >
                {user?.fullName}
              </Typography>
              <Typography color='text.secondary'>{user?.email}</Typography>
            </Box>
          </S.Header>

          {user?.resume && (
            <>
              <Divider />
              <S.Body p={2}>
                <Button
                  variant='outlined'
                  color='black'
                  sx={{ borderRadius: 3 }}
                  onClick={() => {
                    if (user?.resume) openPdfInAnotherPage(user?.resume)
                  }}
                >
                  Ver currículo
                </Button>
              </S.Body>
            </>
          )}
        </S.Wrapper>
      </S.Paper>
    </S.Button>
  )
}
