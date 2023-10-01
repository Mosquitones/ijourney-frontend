/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from 'react'

import {
  CheckSharp,
  CircleSharp,
  Close,
  Delete,
  DoNotDisturbOn,
  Fastfood,
  Help,
  HelpOutlineOutlined,
  Hotel,
  LaptopMac,
  NotInterested,
  RectangleSharp,
  Remove,
  Repeat,
  RestoreFromTrash,
} from '@mui/icons-material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineItemClasses,
  TimelineOppositeContent,
} from '@mui/lab'
import {
  Autocomplete,
  Avatar,
  Box,
  BoxProps,
  ButtonBase,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  EMPLOYMENT_TYPE_LIST,
  LOCATION_TYPE_LIST,
  VULNERABILITIES_LIST,
} from '@types'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { renderSelectedCheckbox } from 'views/auth'

import {
  Button,
  DialogTitleComponent,
  Input,
  InputLabel,
  MarkdownViewer,
} from 'components'
import { useAuth, useFeedback } from 'contexts'
import { useIsDevice, useSkills } from 'hooks'
import {
  ApiResponseTypes,
  CourseRegisterPayloadTypes,
  CourseServices,
  PositionRegisterPayloadTypes,
  PositionServices,
  SkillServices,
} from 'services'
import { convertToBase64 } from 'utils'

import { CourseModalHandlerPropTypes } from './CourseModalHandler.types'
import { CourseModalHandlerSchema } from './utils/CourseModalHandler.schema'

const HighlightedContainer: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        ...rest.sx,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        border: ({ palette }) => `0.1rem solid ${palette.grey[100]}`,
        borderRadius: '0.5rem',
      }}
    >
      {children}
    </Box>
  )
}

const HighlightedHeader: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      {...rest}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      bgcolor={({ palette }) => palette.background.paper}
      borderBottom={({ palette }) => `0.1rem solid ${palette.divider}`}
      px={2}
      py={2}
      gap={2}
      flexWrap='wrap'
    >
      {children}
    </Box>
  )
}

export const CourseModalHandler: React.FC<CourseModalHandlerPropTypes> = ({
  course,
  mentors,
  skills,
  refetchCourses,
  ...rest
}) => {
  const { userId } = useAuth()
  const { alert } = useFeedback()
  const isDevice = useIsDevice()
  const queryClient = useQueryClient()
  const action = `${course ? 'Editar' : 'Criar'} curso`

  const handleClose = () => {
    rest.onClose?.({}, 'backdropClick')
  }

  const courseRegisterMutation = useMutation({
    mutationKey: ['/courses/register', { method: 'POST' }],
    mutationFn: CourseServices.register.post,
    onSuccess: (course) => {
      refetchCourses?.()
      alert.showSuccess(`Curso: ${course.title} - criado com sucesso!`)

      setTimeout(() => {
        handleClose()
      }, 1000)
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(
        error.response?.data.message || error.message || error.toString()
      )
    },
  })

  // const positionUpdateQuery = useMutation({
  //   mutationKey: ['/course/update', { method: 'PUT' }],
  //   mutationFn: PositionServices.put,
  //   onSuccess: (position) => {
  //     alert.showSuccess(`Vaga: ${position.title} - editada com sucesso`)
  //     queryClient.setQueryData(
  //       [`/positions/${position.id}`, { method: 'GET' }],
  //       position
  //     )
  //     // refetchPositions?.()

  //     setTimeout(() => {
  //       handleClose()
  //     }, 1000)
  //   },
  //   onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
  //     alert.showError(error.response?.data.message || error.message)
  //   },
  // })

  const formik = useFormik<CourseRegisterPayloadTypes>({
    initialValues: course
      ? {
          title: course.title,
          picture: course.picture,
          description: course.description,
          createdAt: String(new Date(course.createdAt).getTime()),
          skillsId: course.skills?.flatMap((skill) => skill.id),
          mentorsId: course.mentors?.flatMap((mentor) => mentor.id),
        }
      : {
          title: '',
          picture: '',
          description: '',
          createdAt: String(new Date().getTime()),
          skillsId: [],
          mentorsId: [],
        },
    validationSchema: CourseModalHandlerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const createdAt = format(Number(values.createdAt), 'yyyy-MM-dd')

      const payload: CourseRegisterPayloadTypes = {
        ...values,
        createdAt,
      }

      if (course) {
        // edit
        // positionUpdateQuery.mutate(newPayload)
      } else {
        courseRegisterMutation.mutate(payload)
      }
    },
  })

  const noOptionsText = 'Nenhuma opção encontrada'

  // React.useEffect(() => {
  //   console.log(formik.values)
  // }, [formik.values])

  // React.useEffect(() => {
  //   console.log(course?.skilLs?.flatMap((skill) => skill.id))
  // }, [course])

  const selectedSkills = useMemo(
    () => skills?.filter((skill) => formik.values.skillsId?.includes(skill.id)),
    [formik.values.skillsId, skills]
  )

  const selectedMentors = useMemo(
    () =>
      mentors?.filter((mentor) => formik.values.mentorsId?.includes(mentor.id)),
    [formik.values.mentorsId, mentors]
  )

  return (
    <Dialog
      {...rest}
      fullWidth
      maxWidth='md'
      scroll='paper'
      fullScreen={isDevice.to.md}
    >
      <Box component='form' onSubmit={formik.handleSubmit}>
        <Box
          bgcolor={({ palette }) => palette.background.paper}
          position='sticky'
          top={0}
          zIndex={({ zIndex }) => zIndex.appBar}
          borderBottom={({ palette }) => `0.1rem solid ${palette.divider}`}
        >
          <DialogTitleComponent title={action} onClose={handleClose} />
        </Box>

        <Container maxWidth='md' sx={{ flex: 1 }}>
          <Box
            py={3}
            px={2}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Input
              {...formik.getFieldProps('title')}
              label='Título do curso'
              required
              error={formik.touched.title && !!formik.errors.title}
              helperText={
                formik.touched.title ? formik.errors.title : undefined
              }
            />

            {formik.values.picture ? (
              <Box display='flex' flexDirection='column' gap={1}>
                <InputLabel required>Banner</InputLabel>
                <Box position='relative'>
                  <Avatar
                    alt={formik.values.title}
                    variant='rounded'
                    src={formik.values.picture}
                    style={{ width: 'auto', height: '100%' }}
                  />
                  <Button
                    color='error'
                    variant='contained'
                    sx={{ position: 'absolute', top: '2rem', right: '2rem' }}
                    onClick={() => {
                      formik.setFieldValue('picture', '')
                    }}
                    endIcon={<SvgIcon component={Delete} />}
                  >
                    Remover
                  </Button>
                </Box>
              </Box>
            ) : (
              <Input
                {...formik.getFieldProps('picture')}
                value={undefined}
                type='file'
                required
                error={formik.touched.picture && !!formik.errors.picture}
                helperText={
                  formik.touched.picture ? formik.errors.picture : undefined
                }
                inputProps={{ accept: 'image/*' }}
                label='Banner'
                placeholder='Escolha um arquivo de IMAGEM'
                onChange={async (e) => {
                  const { files } = e.target as HTMLInputElement

                  if (files) {
                    const file = files[0]
                    const fileBase64 = await convertToBase64(file)
                    formik.setFieldValue('picture', fileBase64)
                  }
                }}
              />
            )}

            <Input
              {...formik.getFieldProps('description')}
              label='Descrição'
              required
              multiline
              minRows={6}
              error={formik.touched.description && !!formik.errors.description}
              helperText={
                formik.touched.description
                  ? formik.errors.description
                  : undefined
              }
            />

            <Autocomplete
              id='skillsId-autocomplete-box'
              multiple
              value={selectedSkills}
              options={skills}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.id}>
                  {renderSelectedCheckbox(selected)}
                  {option.name}
                </li>
              )}
              noOptionsText={noOptionsText}
              onChange={(_, skills) => {
                const skillIds = skills.flatMap((skill) => skill.id)
                if (skills) {
                  formik.setFieldValue('skillsId', skillIds)
                }
              }}
              onBlur={(e) => formik.handleBlur('skillsId')(e)}
              renderInput={(params) => {
                params.id = `skillsId`

                return (
                  <Input
                    {...params}
                    name={params.id}
                    error={formik.touched.skillsId && !!formik.errors.skillsId}
                    helperText={
                      formik.touched.skillsId
                        ? Array.isArray(formik.errors.skillsId)
                          ? formik.errors.skillsId.join(', ')
                          : formik.errors.skillsId
                        : undefined
                    }
                    label='Certificações'
                    placeholder='Selecione'
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      required: true,
                    }}
                  />
                )
              }}
            />

            <Autocomplete
              id='mentorsId-autocomplete-box'
              multiple
              value={selectedMentors}
              options={mentors}
              disableCloseOnSelect
              loading={mentors.length === 0}
              loadingText='Carregando mentores...'
              getOptionLabel={(option) => option.fullName}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.id}>
                  {renderSelectedCheckbox(selected)}
                  <Box display='flex' gap={2}>
                    <Avatar
                      variant='rounded'
                      src={option.picture || undefined}
                      sx={{ width: 20, height: 20 }}
                    />
                    {option.fullName}
                  </Box>
                </li>
              )}
              renderTags={(mentors, tagProps, ownerState) => (
                <Box display='flex' gap={1} flexWrap='wrap'>
                  {mentors.map((mentor) => (
                    <Chip
                      {...tagProps}
                      size='medium'
                      key={mentor.id}
                      avatar={
                        <Avatar
                          alt={mentor.fullName}
                          src={mentor.picture || undefined}
                        />
                      }
                      label={mentor.fullName}
                      variant='outlined'
                      onDelete={() => {
                        const newMentorIds = formik.values.mentorsId.filter(
                          (mentorId) => mentorId !== mentor.id
                        )
                        formik.setFieldValue('mentorsId', newMentorIds)
                      }}
                    />
                  ))}
                </Box>
              )}
              noOptionsText={noOptionsText}
              onChange={(_, mentors) => {
                const mentorIds = mentors.flatMap((mentor) => mentor.id)
                if (mentors) {
                  formik.setFieldValue('mentorsId', mentorIds)
                }
              }}
              onBlur={(e) => formik.handleBlur('mentorsId')(e)}
              renderInput={(params) => {
                params.id = `mentorsId`

                return (
                  <Input
                    {...params}
                    name={params.id}
                    error={
                      formik.touched.mentorsId && !!formik.errors.mentorsId
                    }
                    helperText={
                      formik.touched.mentorsId
                        ? Array.isArray(formik.errors.mentorsId)
                          ? formik.errors.mentorsId.join(', ')
                          : formik.errors.mentorsId
                        : undefined
                    }
                    label='Mentor(es)'
                    placeholder='Selecione'
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      required: true,
                    }}
                  />
                )
              }}
            />
          </Box>
        </Container>

        <Divider />
        <DialogContent
          sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
        >
          <Button
            variant='outlined'
            color='black'
            type='button'
            onClick={handleClose}
          >
            Fechar
          </Button>
          <Button
            variant='contained'
            color='black'
            type='submit'
            loading={courseRegisterMutation.isLoading}
          >
            {action}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
