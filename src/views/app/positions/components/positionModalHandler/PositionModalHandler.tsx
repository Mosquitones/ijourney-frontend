/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react'

import { RestoreFromTrash } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  SvgIcon,
  Typography,
} from '@mui/material'
import { EMPLOYMENT_TYPE_LIST, LOCATION_TYPE_LIST } from '@types'
import { useFormik } from 'formik'
import { useQuery } from 'react-query'

import { Button, DialogTitleComponent, Input } from 'components'
import { useAuth } from 'contexts'
import { PositionRegisterPayloadTypes, SkillServices } from 'services'

import { PositionModalHandlerPropTypes } from './PositionModalHandler.types'

const DEFAULT_REQUIREMENT: PositionRegisterPayloadTypes['requirements'][number] =
  { requiredSkillId: -1, points: 0 }

export const PositionModalHandler: React.FC<PositionModalHandlerPropTypes> = ({
  position,
  ...rest
}) => {
  const { userId } = useAuth()
  const action = `${position ? 'Editar' : 'Criar'} vaga`

  const skillsQuery = useQuery({
    queryKey: ['/skills', { method: 'GET' }],
    queryFn: SkillServices.findAll,
  })

  const formik = useFormik<PositionRegisterPayloadTypes>({
    initialValues: {
      title: '',
      shortDescription: '',
      longDescription: '',
      salaryRange: 0,
      city: '',
      state: '',
      employmentType: null,
      locationType: null,
      numOfHiredPeople: 0,
      phases: [],
      requirements: [DEFAULT_REQUIREMENT],
      creationDate: new Date().toLocaleDateString(),
      recruiterId: userId,
    },
    onSubmit: (values) => {
      console.log(values)
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

  return (
    <Dialog {...rest} fullWidth maxWidth='md' scroll='paper'>
      <DialogTitleComponent
        title={action}
        onClose={() => {
          rest.onClose?.({}, 'backdropClick')
        }}
      />
      <Divider />

      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        py={3}
        px={2}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Input
          {...formik.getFieldProps('title')}
          label='Título da vaga'
          required
        />
        <Input
          {...formik.getFieldProps('shortDescription')}
          inputProps={{ maxLength: 150 }}
          label='Descrição curta'
          required
        />
        <Input
          {...formik.getFieldProps('longDescription')}
          multiline
          rows={10}
          label='Descrição completa'
          required
        />
        <Input
          {...formik.getFieldProps('city')}
          label='Qual a cidade?'
          required
        />
        <Input
          {...formik.getFieldProps('state')}
          label='Qual o estado?'
          required
        />
        <Input
          {...formik.getFieldProps('salaryRange')}
          type='number'
          label='Qual o salário ofertado?'
          required
        />
        <Input
          {...formik.getFieldProps('numOfHiredPeople')}
          type='number'
          label='Quantas pessoas podem ser contratadas?'
          required
        />

        <Autocomplete
          id='employment-type-autocomplete-box'
          autoHighlight
          disablePortal
          fullWidth
          value={selectedEmploymentType}
          inputValue={selectedEmploymentType?.label}
          onKeyPress={handleOnKeyPress}
          options={EMPLOYMENT_TYPE_LIST}
          getOptionLabel={(option) => option.label}
          onChange={(_, employmentType) => {
            if (employmentType) {
              formik.setFieldValue('employmentType', employmentType.key)
            }
          }}
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
          onKeyPress={handleOnKeyPress}
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
                  formik.touched.locationType && !!formik.errors.locationType
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

        <Box
          component='fieldset'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            border: ({ palette }) => `0.1rem solid ${palette.grey[100]}`,
            px: 2,
            py: 3,
            borderRadius: '0.5rem',
          }}
        >
          <Typography
            component='legend'
            color='text.secondary'
            px={1}
            // fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Requisitos
          </Typography>
          {formik.values.requirements.map((requirement, index) => (
            <Box
              display='flex'
              alignItems='self-end'
              gap={3}
              key={requirement.requiredSkillId + index}
            >
              <Autocomplete
                id={`skills-autocomplete-box-${index}`}
                autoHighlight
                disablePortal
                fullWidth
                value={skillsQuery.data?.find(
                  (where) => where.id === requirement.requiredSkillId
                )}
                inputValue={
                  skillsQuery.data?.find(
                    (where) => where.id === requirement.requiredSkillId
                  )?.name
                }
                onKeyPress={handleOnKeyPress}
                options={skillsQuery.data || []}
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
                  formik.handleBlur(`requirements[${index}].requiredSkillId`)(e)
                }
                renderInput={(params) => {
                  params.id = `requirements[${index}].requiredSkillId`

                  return (
                    <Input
                      {...params}
                      name={params.id}
                      error={
                        formik.touched.requirements &&
                        !!formik.errors.requirements
                      }
                      helperText={
                        formik.touched.requirements
                          ? Array.isArray(formik.errors.requirements)
                            ? formik.errors.requirements.join(', ')
                            : formik.errors.requirements
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
              <Input
                {...formik.getFieldProps(`requirements[${index}].points`)}
                label='Vale quantos pontos?'
                required
              />

              <IconButton
                color='error'
                disabled={index === 0}
                onClick={() => {
                  formik.setFieldValue(
                    'requirements',
                    formik.values.requirements.filter((_, i) => i !== index)
                  )
                }}
              >
                <SvgIcon component={RestoreFromTrash} />
              </IconButton>
            </Box>
          ))}
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
        </Box>
      </Box>

      <Box position='sticky' bottom={0} bgcolor='white' zIndex={1000}>
        <Divider />
        <DialogContent
          sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
        >
          <Button variant='outlined' color='black' type='reset'>
            Apagar
          </Button>
          <Button variant='contained' color='black' type='submit'>
            {action}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
