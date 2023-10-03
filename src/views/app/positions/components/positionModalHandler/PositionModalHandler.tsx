/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Box,
  BoxProps,
  ButtonBase,
  Container,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputLabel,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  EMPLOYMENT_TYPE_ENUM,
  EMPLOYMENT_TYPE_LIST,
  LOCATION_TYPE_ENUM,
  LOCATION_TYPE_LIST,
  VULNERABILITIES_LIST,
} from '@types'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { renderSelectedCheckbox } from 'views/auth'

import { Button, DialogTitleComponent, Input, MarkdownViewer } from 'components'
import { useAuth, useFeedback } from 'contexts'
import { useIsDevice } from 'hooks'
import {
  ApiResponseTypes,
  PositionRegisterPayloadTypes,
  PositionServices,
  SkillServices,
} from 'services'

import { PositionModalHandlerPropTypes } from './PositionModalHandler.types'
import { PositionModalHandlerSchema } from './utils/PositionModalHandler.schema'

type _Requirement = PositionRegisterPayloadTypes['requirements'][number]
type _Phase = PositionRegisterPayloadTypes['phases'][number]

type PhaseStatusType = _Phase['phaseStatusType']
type PhaseStatusTypeColorMap = {
  [key in PhaseStatusType]: 'success.main' | 'warning.main' | 'divider'
}

export const phaseStatusTypeMap: PhaseStatusTypeColorMap = {
  APPLIED: 'success.main',
  SELECTED: 'success.main',
  PENDING: 'warning.main',
  HIRED: 'divider',
}

const DEFAULT_REQUIREMENT: _Requirement = {
  requiredSkillId: -1,
  points: -1,
}

const DEFAULT_PHASE: _Phase = {
  name: '',
  description: '',
  phaseStatusType: 'PENDING',
  sequenceIndex: 2,
}

const REQUIRED_INITIAL_PHASES: _Phase[] = [
  {
    name: 'Aplicado',
    description: 'Início do processo seletivo, candidato aplicou-se à vaga.',
    phaseStatusType: 'APPLIED',
    sequenceIndex: 0,
  },
  {
    name: 'Selecionado',
    description: 'Candidato foi selecionado à vaga.',
    phaseStatusType: 'SELECTED',
    sequenceIndex: 1,
  },
]

const REQUIRED_END_PHASE: _Phase = {
  name: 'Contratado',
  description: 'Fim do processo seletivo - Candidato contratado!',
  phaseStatusType: 'HIRED',
  sequenceIndex: 3,
}

const mergePendingPhasesWithRequiredPhases = (phases: _Phase[]) => {
  const phasesWithNewIndex = phases.map((phase, index) => ({
    ...phase,
    sequenceIndex: index + REQUIRED_INITIAL_PHASES.length,
  }))

  const initialMergedPhases = [
    ...REQUIRED_INITIAL_PHASES,
    ...phasesWithNewIndex,
  ]

  const newEndPhase: _Phase = {
    ...REQUIRED_END_PHASE,
    sequenceIndex: initialMergedPhases.length,
  }

  return [...initialMergedPhases, newEndPhase]
}

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

export const PositionModalHandler: React.FC<PositionModalHandlerPropTypes> = ({
  position,
  skills,
  refetchPositions,
  ...rest
}) => {
  const { userId } = useAuth()
  const { alert } = useFeedback()
  const isDevice = useIsDevice()
  const queryClient = useQueryClient()
  const action = `${position ? 'Editar' : 'Criar'} vaga`

  const positionRegisterQuery = useMutation({
    mutationKey: ['/positions/register', { method: 'POST' }],
    mutationFn: PositionServices.post,
    onSuccess: (position) => {
      alert.showSuccess(`Vaga: ${position.title} - criada com sucesso`)
      refetchPositions?.()

      setTimeout(() => {
        handleClose()
      }, 1000)
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const positionUpdateQuery = useMutation({
    mutationKey: ['/positions/update', { method: 'PUT' }],
    mutationFn: PositionServices.put,
    onSuccess: (position) => {
      alert.showSuccess(`Vaga: ${position.title} - editada com sucesso`)
      queryClient.setQueryData(
        [`/positions/${position.id}`, { method: 'GET' }],
        position
      )
      refetchPositions?.()

      setTimeout(() => {
        handleClose()
      }, 1000)
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const formik = useFormik<PositionRegisterPayloadTypes>({
    initialValues: position
      ? {
          ...position,
          creationDate: String(new Date(position.creationDate).getTime()),
          requirements: position?.requirements.flatMap((requirement) => ({
            points: requirement.points,
            requiredSkillId: requirement.skill.id,
          })),
        }
      : {
          title: '',
          shortDescription: '',
          longDescription: '',
          salaryRange: -1,
          city: '',
          state: '',
          employmentType: null,
          locationType: null,
          numOfMaxHiredPeople: 1,
          phases: mergePendingPhasesWithRequiredPhases([DEFAULT_PHASE]),
          requirements: [DEFAULT_REQUIREMENT],
          creationDate: String(new Date().getTime()),
          recruiterId: userId,
          vulnerabilityList: [],
        },
    validationSchema: PositionModalHandlerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (payload) => {
      const creationDate = format(Number(payload.creationDate), 'yyyy-MM-dd')
      const newPayload: PositionRegisterPayloadTypes = {
        ...payload,
        creationDate,
      }

      if (position) {
        positionUpdateQuery.mutate(newPayload)
      } else {
        positionRegisterQuery.mutate(newPayload)
      }
    },
  })

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const selectedEmploymentType = useMemo(
    () =>
      EMPLOYMENT_TYPE_LIST.find(
        (where) => where.key === formik.values.employmentType
      ),
    [formik.values.employmentType]
  )

  const selectedLocationType = useMemo(
    () =>
      LOCATION_TYPE_LIST.find(
        (where) => where.key === formik.values.locationType
      ),
    [formik.values.locationType]
  )

  const selectedVulnerabilityList = useMemo(
    () =>
      VULNERABILITIES_LIST.filter((vulnerability) =>
        formik.values.vulnerabilityList.includes(vulnerability.value)
      ),
    [formik.values.vulnerabilityList]
  )

  const noOptionsText = 'Nenhuma opção encontrada'

  const handleClose = () => {
    rest.onClose?.({}, 'backdropClick')
  }

  const handleFillPosition = () => {
    formik.setValues({
      title: 'Desenvolvedor Front-end Junior',
      shortDescription:
        'Pessoa que crie interfaces web atraentes e responsivas, colabore com a equipe de design e contribua para o desenvolvimento de experiências digitais de alta qualidade.',
      salaryRange: 1500,
      city: 'Suzano',
      state: 'SP',
      creationDate: String(new Date().getTime()),
      employmentType: null,
      locationType: null,
      longDescription: `
*🌱🌿 Topsort is a data-driven, next-generation auction-based advertising tool and set of APIs. We’re navigating the post-cookie world by providing a product data-driven set of technology to drive effective monetization via sponsored listings, banners, and offsite advertising, without compromising user data or building a walled garden with cookies.*

*We’re looking for a talented and experienced Webflow Developer specialized in frontend development to join our team! If you’re passionate about creating stunning websites and have a keen eye for detail, this position is for you! 🌟*

#### What this job will look like

- Design and develop visually stunning, responsive, and user-friendly websites using Webflow 🎨;
Collaborate with our design and marketing teams to ensure seamless integration of branding and messaging 🤝;
- Implement and optimize web animations, interactions, and other dynamic elements for a top-notch user experience 🕹️;
- Conduct testing to ensure cross-browser and cross-device compatibility 🌐;
- Troubleshoot and resolve issues related to website functionality and performance 🛠️;
- Stay up-to-date on the latest web development trends and technologies to ensure our websites are cutting edge 🔍.

#### Skills and Qualifications

- 3+ years of experience in web development with a strong focus on frontend and Webflow 🧑‍💻;
- Expert knowledge of HTML, CSS, and JavaScript 📚;
- Familiarity with responsive design, browser compatibility testing, and performance optimization 🚀;
- Strong understanding of UX/UI principles, with an eye for detail and aesthetics 🎯;
- Excellent communication skills in English and Spanish (written and verbal) 🗣️;
- Ability to work independently and collaboratively in a fast-paced, remote environment 🌍;
- Bonus: Experience with other web development tools, such as WordPress or Shopify, and basic - knowledge of SEO best practices 🌟;
- A team player - Topsort’s culture is one of a sports team, we welcome ownership and collaboration.
Bonus Points
- Previous experience in a fast-paced tech scale-up;
- Knowledge of app development and API designs;
- Familiarity with Agile methodologies and tools (Scrum, Kanban, JIRA, etc.).
- Benefits

#### Stock Options;
- Flexible PTO + sick time;
- Medical, dental and vision insurance;
- Wework membership reimbursement & learning benefits;
- Networking events & industry-related events;
- Meditation Apps and Anniversary Celebrations;
- Be surrounded by awesome and intelligent peers - our team inspires each other! We’re constantly adding more and hearing from our team on what to improve here.
- Are you ready to take your development game to the next level at Topsort? Apply now and let’s make waves together in the tech world!

Topsort is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. 🌈💼
      `,
      numOfMaxHiredPeople: 1,
      phases: mergePendingPhasesWithRequiredPhases([DEFAULT_PHASE]),
      recruiterId: userId,
      requirements: [
        {
          requiredSkillId: 4,
          points: 400,
        },
        {
          requiredSkillId: 5,
          points: 200,
        },
        {
          requiredSkillId: 1,
          points: 100,
        },
        {
          requiredSkillId: 2,
          points: 100,
        },
      ],
      vulnerabilityList: [],
    })
  }

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
          <DialogTitleComponent
            title={action}
            onClose={handleClose}
            helpTitleAdornment={
              position ? undefined : (
                <button type='button' onClick={handleFillPosition}>
                  preencher vaga
                </button>
              )
            }
          />
        </Box>

        <Container maxWidth='md'>
          <Box
            py={3}
            px={2}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Input
              {...formik.getFieldProps('title')}
              label='Título da vaga'
              required
              error={formik.touched.title && !!formik.errors.title}
              helperText={
                formik.touched.title ? formik.errors.title : undefined
              }
            />
            <Input
              {...formik.getFieldProps('shortDescription')}
              inputProps={{ maxLength: 150 }}
              label='Descrição curta'
              required
              error={
                formik.touched.shortDescription &&
                !!formik.errors.shortDescription
              }
              helperText={
                formik.touched.shortDescription
                  ? formik.errors.shortDescription
                  : undefined
              }
            />
            <Box
              display={{ xs: 'flex', md: 'grid' }}
              flexDirection='column'
              gridTemplateColumns='repeat(2, 1fr)'
              alignItems={{ md: 'center' }}
              gap={2}
            >
              <Input
                {...formik.getFieldProps('longDescription')}
                multiline
                minRows={10}
                label='Descrição completa'
                required
                error={
                  formik.touched.longDescription &&
                  !!formik.errors.longDescription
                }
                helperText={
                  formik.touched.longDescription
                    ? formik.errors.longDescription
                    : undefined
                }
              />
              <Box
                display='flex'
                flexDirection='column'
                alignItems='self-start'
                justifyContent='flex-start'
                flex={1}
                gap={1}
                height='100%'
                overflow='auto'
                minHeight={210}
              >
                <Box display='flex' alignItems='center'>
                  <InputLabel sx={{ m: 0 }}>Prévia do Markdown</InputLabel>
                  <Tooltip title='Clique para aprender a escrever em Markdown'>
                    <IconButton
                      tabIndex={-1}
                      color='primary'
                      size='small'
                      target='_blank'
                      href='https://www.markdownguide.org/basic-syntax/'
                    >
                      <HelpOutlineOutlined fontSize='small' color='primary' />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  border={({ palette }) => `0.1rem solid ${palette.grey[100]}`}
                  borderRadius='0.5rem'
                  width='100%'
                  height='100%'
                  flex={1}
                  py='0.85rem'
                  px='1.4rem'
                  overflow='auto'
                >
                  <MarkdownViewer markdown={formik.values.longDescription} />
                </Box>
              </Box>
            </Box>
            <Box display='flex' gap={2} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
              <Input
                {...formik.getFieldProps('state')}
                label='Qual o estado?'
                error={formik.touched.state && !!formik.errors.state}
                helperText={
                  formik.touched.state ? formik.errors.state : undefined
                }
                required
              />
              <Input
                {...formik.getFieldProps('city')}
                label='Qual a cidade?'
                error={formik.touched.city && !!formik.errors.city}
                helperText={
                  formik.touched.city ? formik.errors.city : undefined
                }
                required
              />
            </Box>
            <Input
              {...formik.getFieldProps('salaryRange')}
              value={
                formik.values.salaryRange === -1
                  ? ''
                  : formik.values.salaryRange
              }
              type='number'
              label='Qual o salário ofertado?'
              error={formik.touched.salaryRange && !!formik.errors.salaryRange}
              helperText={
                formik.touched.salaryRange
                  ? formik.errors.salaryRange
                  : undefined
              }
              required
            />
            <Input
              {...formik.getFieldProps('numOfMaxHiredPeople')}
              type='number'
              label='Quantas pessoas podem ser contratadas?'
              error={
                formik.touched.numOfMaxHiredPeople &&
                !!formik.errors.numOfMaxHiredPeople
              }
              helperText={
                formik.touched.numOfMaxHiredPeople
                  ? formik.errors.numOfMaxHiredPeople
                  : undefined
              }
              inputProps={{ min: 1 }}
              required
            />

            <Box display='flex' gap={2} flexWrap='wrap'>
              <Autocomplete
                id='employment-type-autocomplete-box'
                autoHighlight
                disablePortal
                fullWidth
                value={selectedEmploymentType}
                inputValue={selectedEmploymentType?.label}
                // onKeyPress={handleOnKeyPress}
                options={EMPLOYMENT_TYPE_LIST}
                getOptionLabel={(option) => option.label}
                onChange={(_, employmentType) => {
                  if (employmentType) {
                    formik.setFieldValue('employmentType', employmentType.key)
                  }
                }}
                noOptionsText={noOptionsText}
                onBlur={(e) => formik.handleBlur('employmentType')(e)}
                renderInput={(params) => {
                  params.id = 'employmentType'

                  return (
                    <Input
                      {...params}
                      name={params.id}
                      error={
                        formik.touched.employmentType &&
                        !!formik.errors.employmentType
                      }
                      helperText={
                        formik.touched.employmentType
                          ? formik.errors.employmentType
                          : undefined
                      }
                      label='Qual o tipo de contratação?'
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
                id='location-type-autocomplete-box'
                autoHighlight
                disablePortal
                fullWidth
                value={selectedLocationType}
                inputValue={selectedLocationType?.label}
                // onKeyPress={handleOnKeyPress}
                noOptionsText={noOptionsText}
                options={LOCATION_TYPE_LIST}
                getOptionLabel={(option) => option.label}
                onChange={(_, locationType) => {
                  if (locationType) {
                    formik.setFieldValue('locationType', locationType.key)
                  }
                }}
                onBlur={(e) => formik.handleBlur('locationType')(e)}
                renderInput={(params) => {
                  params.id = 'locationType'

                  return (
                    <Input
                      {...params}
                      name={params.id}
                      error={
                        formik.touched.locationType &&
                        !!formik.errors.locationType
                      }
                      helperText={
                        formik.touched.locationType
                          ? formik.errors.locationType
                          : undefined
                      }
                      label='Qual o modelo de trabalho?'
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

            <Autocomplete
              id='vulnerabilities-autocomplete-box'
              multiple
              value={selectedVulnerabilityList}
              options={VULNERABILITIES_LIST}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.value}>
                  {renderSelectedCheckbox(selected)}
                  {option.label}
                </li>
              )}
              noOptionsText={noOptionsText}
              onChange={(_, vulnerabilities) => {
                const vulnerabilitiesList = vulnerabilities.flatMap(
                  (vulnerability) => vulnerability.value
                )
                formik.setFieldValue('vulnerabilityList', vulnerabilitiesList)
              }}
              renderInput={(params) => (
                <Input
                  {...params}
                  {...formik.getFieldProps('vulnerabilityList')}
                  error={
                    formik.touched.vulnerabilityList &&
                    !!formik.errors.vulnerabilityList
                  }
                  helperText={
                    formik.touched.vulnerabilityList
                      ? Array.isArray(formik.errors.vulnerabilityList)
                        ? formik.errors.vulnerabilityList.join(', ')
                        : formik.errors.vulnerabilityList
                      : undefined
                  }
                  label='Vaga exclusiva para (opcional)'
                  placeholder='Caso seja para uma vaga exclusiva, selecione'
                />
              )}
            />

            <HighlightedContainer>
              <HighlightedHeader>
                <Typography
                  variant='h4'
                  fontWeight={({ typography }) => typography.fontWeightBold}
                >
                  Requisitos
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    formik.setFieldValue('requirements', [
                      ...formik.values.requirements,
                      DEFAULT_REQUIREMENT,
                    ])
                  }}
                >
                  Adicionar requisito
                </Button>
              </HighlightedHeader>
              <Box
                px={2}
                pt={0}
                pb={3}
                display='flex'
                flexDirection='column'
                gap={2}
              >
                {formik.values.requirements.map((requirement, index) => (
                  <Box
                    display='flex'
                    flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
                    alignItems='flex-end'
                    gap={3}
                    key={requirement.requiredSkillId + index}
                  >
                    <Box
                      flex={1}
                      display='flex'
                      gap={3}
                      flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
                      alignItems='flex-start'
                    >
                      <Autocomplete
                        id={`skills-autocomplete-box-${index}`}
                        autoHighlight
                        disablePortal
                        fullWidth
                        value={skills.find(
                          (where) => where.id === requirement.requiredSkillId
                        )}
                        inputValue={
                          skills.find(
                            (where) => where.id === requirement.requiredSkillId
                          )?.name
                        }
                        noOptionsText={noOptionsText}
                        // onKeyPress={handleOnKeyPress}
                        options={skills}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, skill) => {
                          if (skill) {
                            formik.setFieldValue(
                              `requirements[${index}].requiredSkillId`,
                              skill.id
                            )
                          }
                        }}
                        onBlur={(e) =>
                          formik.handleBlur(
                            `requirements[${index}].requiredSkillId`
                          )(e)
                        }
                        renderInput={(params) => {
                          params.id = `requirements[${index}].requiredSkillId`

                          return (
                            <Input
                              {...params}
                              name={params.id}
                              error={
                                formik.touched.requirements?.[index]
                                  ?.requiredSkillId &&
                                !!formik.errors.requirements?.[index]
                              }
                              helperText={
                                formik.touched.requirements?.[index]
                                  ?.requiredSkillId
                                  ? (formik.errors.requirements?.[index] as any)
                                      ?.requiredSkillId
                                  : undefined
                              }
                              label={
                                index === 0 ? 'Qual o requisito?' : undefined
                              }
                              placeholder='Selecione'
                              InputLabelProps={{
                                ...params.InputLabelProps,
                                required: true,
                              }}
                            />
                          )
                        }}
                      />
                      <Input
                        {...formik.getFieldProps(
                          `requirements[${index}].points`
                        )}
                        value={
                          requirement.points === -1 ? '' : requirement.points
                        }
                        type='number'
                        label={index === 0 ? 'Vale quantos pontos?' : undefined}
                        inputProps={{ min: 0 }}
                        error={
                          formik.touched.requirements?.[index]?.points &&
                          !!formik.errors.requirements?.[index]
                        }
                        helperText={
                          formik.touched.requirements?.[index]?.points
                            ? (formik.errors.requirements?.[index] as any)
                                ?.points
                            : undefined
                        }
                        required
                      />
                    </Box>

                    <IconButton
                      color='error'
                      disabled={index === 0}
                      onClick={() => {
                        formik.setFieldValue(
                          'requirements',
                          formik.values.requirements.filter(
                            (_, i) => i !== index
                          )
                        )
                      }}
                    >
                      <SvgIcon component={Delete} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </HighlightedContainer>

            <HighlightedContainer>
              <HighlightedHeader>
                <Typography
                  variant='h4'
                  fontWeight={({ typography }) => typography.fontWeightBold}
                >
                  Processos
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    const newPhasesWithoutInitialPhases =
                      formik.values.phases.slice(REQUIRED_INITIAL_PHASES.length)

                    const newPhasesWithoutLastPhase =
                      newPhasesWithoutInitialPhases.slice(0, -1)

                    const treatedPhases = [
                      ...newPhasesWithoutLastPhase,
                      DEFAULT_PHASE,
                    ]

                    const newPhases =
                      mergePendingPhasesWithRequiredPhases(treatedPhases)

                    formik.setFieldValue('phases', newPhases)
                  }}
                >
                  Adicionar processo
                </Button>
              </HighlightedHeader>
              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                  pt: 3.8,
                  pb: 3,
                }}
              >
                {formik.values.phases
                  .sort((a, b) => a.sequenceIndex - b.sequenceIndex)
                  .map((phase, index) => {
                    const isPending = phase.phaseStatusType === 'PENDING'
                    const isInitialPhases =
                      phase.phaseStatusType === 'APPLIED' ||
                      phase.phaseStatusType === 'SELECTED'
                    const color = phaseStatusTypeMap[phase.phaseStatusType]

                    const opacityShouldBeInvisible = (cond: boolean) =>
                      cond ? 0 : 1

                    return (
                      <TimelineItem key={phase.sequenceIndex}>
                        <TimelineSeparator>
                          <TimelineConnector
                            color='primary'
                            sx={{
                              bgcolor: color,
                              opacity: opacityShouldBeInvisible(
                                phase.phaseStatusType === 'APPLIED'
                              ),
                            }}
                          />
                          <ButtonBase
                            disabled={!isPending}
                            onClick={() => {
                              const phasesWithoutCurrentPhase =
                                formik.values.phases.filter(
                                  (curPhase) =>
                                    curPhase.sequenceIndex !==
                                    phase.sequenceIndex
                                )
                              const newPhases = phasesWithoutCurrentPhase.map(
                                (curPhase, index) => ({
                                  ...curPhase,
                                  sequenceIndex: index,
                                })
                              )
                              formik.setFieldValue('phases', newPhases)
                            }}
                          >
                            <TimelineDot sx={{ bgcolor: color }}>
                              <SvgIcon
                                component={
                                  isInitialPhases
                                    ? CheckSharp
                                    : isPending
                                    ? Close
                                    : CircleSharp
                                }
                                color='inherit'
                                sx={{
                                  fontSize: 14,
                                  color:
                                    isPending || isInitialPhases
                                      ? 'white'
                                      : color,
                                }}
                              />
                            </TimelineDot>
                          </ButtonBase>
                          <TimelineConnector
                            sx={{
                              bgcolor: color,
                              opacity: opacityShouldBeInvisible(
                                phase.phaseStatusType === 'HIRED'
                              ),
                            }}
                          />
                        </TimelineSeparator>
                        <TimelineContent
                          display='flex'
                          alignItems='center'
                          gap={2}
                          flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
                          mt={index === 0 ? -4.8 : 0}
                        >
                          <Input
                            {...formik.getFieldProps(`phases[${index}].name`)}
                            error={
                              formik.touched.phases?.[index]?.name &&
                              !!formik.errors.phases?.[index]
                            }
                            helperText={
                              formik.touched.phases?.[index]?.name
                                ? (formik.errors.phases?.[index] as any)?.name
                                : undefined
                            }
                            label={index === 0 ? 'Título' : undefined}
                            fullWidth
                            required
                            placeholder='Título'
                            disabled={!isPending}
                          />
                          <Input
                            {...formik.getFieldProps(
                              `phases[${index}].description`
                            )}
                            error={
                              formik.touched.phases?.[index]?.description &&
                              !!formik.errors.phases?.[index]
                            }
                            helperText={
                              formik.touched.phases?.[index]?.description
                                ? (formik.errors.phases?.[index] as any)
                                    ?.description
                                : undefined
                            }
                            label={index === 0 ? 'Descrição' : undefined}
                            fullWidth
                            required
                            placeholder='Descrição'
                            disabled={!isPending}
                          />
                        </TimelineContent>
                      </TimelineItem>
                    )
                  })}
              </Timeline>
            </HighlightedContainer>
          </Box>
        </Container>

        {/* <Box position='sticky' bottom={0} bgcolor='white' zIndex={1000}> */}
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
            loading={
              positionRegisterQuery.isLoading || positionUpdateQuery.isLoading
            }
          >
            {action}
          </Button>
        </DialogContent>
        {/* </Box> */}
      </Box>
    </Dialog>
  )
}
