import React from 'react'

import { AccountCircleOutlined, TextsmsOutlined } from '@mui/icons-material'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Divider,
  Rating,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material'

import { LazyImage } from 'components'

import * as S from './CourseCard.styles'
import { CourseCardPropTypes } from './CourseCard.types'
export const CourseCard: React.FC<CourseCardPropTypes> = ({
  course,
  ...rest
}) => {
  return (
    <Button {...rest} sx={{ p: 0, height: '100%' }} fullWidth>
      <S.Paper>
        <LazyImage
          src={course.picture}
          height={250}
          style={{ objectFit: 'cover' }}
        />
        <Box display='flex' flexDirection='column' gap={2} px={3} py={2}>
          <Typography
            variant='subtitle1'
            textAlign='left'
            aria-label={course.title}
            aria-describedby={course.title}
            lineHeight={1.5}
            fontWeight={({ typography }) => typography.fontWeightBold}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {course.title}
          </Typography>
          <Typography variant='body2' textAlign='left' color='text.secondary'>
            {course.description}
          </Typography>
        </Box>
        <Divider />
        <Box display='flex' flexWrap='wrap' px={3} py={2} gap={1}>
          {course.skills
            .sort((a, b) => a.id - b.id)
            .map((skill) => (
              <Chip key={skill.id} label={skill.name} variant='filled' />
            ))}
        </Box>

        <Divider />
        <Box
          display='flex'
          flexWrap='wrap'
          gap={2}
          px={3}
          py={2}
          alignItems='center'
          justifyContent='space-between'
        >
          <Box display='flex' gap={2} alignItems='center'>
            {course.mentors.length === 1 ? (
              <>
                <Avatar src={course.mentors[0].picture || undefined} />
                <Box display='flex' flexDirection='column'>
                  <Typography
                    variant='body1'
                    fontWeight={({ typography }) => typography.fontWeightBold}
                  >
                    {course.mentors[0].fullName}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ opacity: 0.5 }}
                    textAlign='left'
                  >
                    @{course.mentors[0].username}
                  </Typography>
                </Box>
              </>
            ) : (
              <AvatarGroup max={5}>
                {course.mentors.map((mentor) => (
                  <Tooltip key={mentor.id} title={mentor.fullName}>
                    <Avatar
                      alt={mentor.fullName}
                      src={mentor.picture || undefined}
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            )}
          </Box>
          <Tooltip title={`${course.totalGraduatedCandidate} alunos formados`}>
            <Box display='flex' gap={1} alignItems='center'>
              <SvgIcon
                component={AccountCircleOutlined}
                sx={{ fontSize: 22, color: 'text.secondary' }}
              />
              <Typography color='text.secondary' variant='body2'>
                {course.totalGraduatedCandidate}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        <Divider />
        <S.Footer>
          <Tooltip title={`${course.ratingAverage} de 5 avaliações`}>
            <Box>
              <Rating
                defaultValue={course.ratingAverage}
                name='rating'
                readOnly
                sx={{
                  [`.MuiSvgIcon-root `]: {
                    fontSize: 22,
                  },
                }}
              />
            </Box>
          </Tooltip>
          <Tooltip title={`${course.totalReviews} comentários`}>
            <Box display='flex' gap={1} alignItems='center'>
              <SvgIcon
                component={TextsmsOutlined}
                sx={{ fontSize: 22, color: 'text.secondary' }}
              />
              <Typography color='text.secondary' variant='body2'>
                {course.totalReviews}
              </Typography>
            </Box>
          </Tooltip>
        </S.Footer>
      </S.Paper>
    </Button>
  )
}
