import React from 'react'

import { AccountCircleOutlined, TextsmsOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Divider,
  Rating,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material'

import { LazyImage } from 'components'

import * as S from './CourseCard.styles'
export const CourseCard: React.FC<ButtonProps> = (props) => {
  return (
    <Button {...props} sx={{ p: 0 }} fullWidth>
      <S.Paper>
        <LazyImage
          src='https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg'
          height={250}
          style={{ objectFit: 'cover' }}
        />
        <S.Body>
          <Typography
            variant='subtitle1'
            lineHeight={1.5}
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Aprenda como criar um frontend top com ReactJS. Master class
          </Typography>
          <Box
            display='flex'
            flexWrap='wrap'
            gap={2}
            alignItems='center'
            justifyContent='space-between'
          >
            <Box display='flex' gap={2} alignItems='center'>
              <Avatar src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80' />
              <Box display='flex' flexDirection='column'>
                <Typography
                  variant='body1'
                  fontWeight={({ typography }) => typography.fontWeightBold}
                >
                  Joana Santos
                </Typography>
                <Typography variant='body2' sx={{ opacity: 0.5 }}>
                  @jo.santos
                </Typography>
              </Box>
            </Box>
            <Tooltip title='143 alunos formados'>
              <Box display='flex' gap={1} alignItems='center'>
                <SvgIcon
                  component={AccountCircleOutlined}
                  sx={{ fontSize: '1.8rem', color: 'text.secondary' }}
                />
                <Typography color='text.secondary' variant='body2'>
                  143
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </S.Body>
        <Divider />
        <S.Footer>
          <Rating
            defaultValue={4}
            name='rating'
            readOnly
            sx={{
              [`.MuiSvgIcon-root `]: {
                fontSize: 18,
              },
            }}
          />
          <Tooltip title={'7.530 comentários'}>
            <Box display='flex' gap={1} alignItems='center'>
              <SvgIcon
                component={TextsmsOutlined}
                sx={{ fontSize: '1.8rem', color: 'text.secondary' }}
              />
              <Typography color='text.secondary' variant='body2'>
                7.530
              </Typography>
            </Box>
          </Tooltip>
        </S.Footer>
      </S.Paper>
    </Button>
  )
}
